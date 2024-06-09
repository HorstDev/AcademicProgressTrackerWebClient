import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginData } from 'src/app/interfaces/user/user-login-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: UserLoginData = {
    email: '',
    password: '',
  };
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {
    if (this._authService.loggedIn()) {
      const roles = this._authService.getRoles();
      if (roles?.includes('Admin'))
        this._router.navigate(['/group-management']);
      else if (roles?.includes('Teacher'))
        this._router.navigate(['/lesson-tracker']);
      else
        this._router.navigate(['/report-student']);
    }
  }

  register(user: UserLoginData) {
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

  login(user: UserLoginData) {
    this.isLoading = true;

    this._authService.login(user).subscribe({
      next: (token: string) => {
        localStorage.setItem('authToken', token);
        if (this._authService.loggedIn()) {
          const roles = this._authService.getRoles();
          if (roles?.includes('Admin'))
            this._router.navigate(['/group-management']);
          else if (roles?.includes('Teacher'))
            this._router.navigate(['/lesson-tracker']);
          else
            this._router.navigate(['/report-student']);
        }
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
