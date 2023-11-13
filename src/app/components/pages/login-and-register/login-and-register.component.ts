import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.scss']
})
export class LoginAndRegisterComponent {
  user = new User();
  errorMessage: string | null = null;

  constructor(private _authService: AuthService, private _router: Router) {}

  register(user: User) {
    this._authService.register(user).subscribe({
      next: () => { 
        this.errorMessage = null;
      },
      error: (err) => {
        //Ошибка регистрации
        this.errorMessage = err.error; // Используйте error.error или другое поле для получения текста ошибки
       },
    })
  }

  login(user: User) {
    this._authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      this._router.navigate(['/subjects']);
    });
  }

  getMe() {
    this._authService.getMe().subscribe({
      next: (name: string) => { 
        this.errorMessage = name;
      },
      error: (err) => {
        this.errorMessage = 'не удалось выполнить метод getMe()';
       },
    })
      // (name: any) => {
      //   console.log(name);
      //   this.errorMessage = name;
      //   // Ваш код для вывода имени на экран или выполнения других действий
      // },
      // (error) => {
      //   this.errorMessage = 'не удалось выполнить метод getMe()';
      //   // Ваш код для обработки ошибки, например, вывод сообщения об ошибке
      // }
  }

  loggedIn() {
    this._authService.loggedIn();
    // return !!localStorage.getItem('authToken');
  }

  logout() {
    this._authService.logout();
  }
}
