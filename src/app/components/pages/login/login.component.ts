import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = new User();
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {
    if (this._authService.loggedIn()) {
      this._router.navigate(['/lab-management']);
    }
  }

  register(user: User) {
    this._authService.register(user).subscribe({
      next: () => { 
        this.errorMessage = null;
      },
      error: (err) => {
        //Ошибка регистрации
        this.errorMessage = err.error;
       },
    })
  }

  login(user: User) {
    this.isLoading = true;

    this._authService.login(user).subscribe({
      next: (token: string) => {
        localStorage.setItem('authToken', token);
        this._router.navigate(['/lab-management']);
      },
      error: (err) => {
        this.errorMessage = 'не удалось залогинить';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  getMe() {
    this._authService.getMe().subscribe({
      next: (name: string) => { 
        this.errorMessage = name;
      },
      error: (err) => {
        this.errorMessage = 'не удалось выполнить метод getMe()';
       },
       complete: () => {

       }
    })
  }

  loggedIn() {
    this._authService.loggedIn();
    // return !!localStorage.getItem('authToken');
  }

  logout() {
    this._authService.logout();
  }

  refresh() {
    this._authService.refreshToken().subscribe((token: string) => {
      localStorage.setItem('authToken', token);
    });
  }
}
