import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }

  public register(user: User) : Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Auth/register`,
     user
    );
  }

  public login(user: User) : Observable<string> {
    return this.http.post(`${environment.apiUrl}/Auth/login`,
     user, {responseType: 'text', withCredentials: true}
    );
  }

  public refreshToken() : Observable<string> {
    return this.http.post(`${environment.apiUrl}/Auth/refresh-token`, {}, {responseType: 'text', withCredentials: true})
  }

  public getMe() : Observable<string> {
    return this.http.get(`${environment.apiUrl}/Auth`, {responseType: 'text'});
  }

  public loggedIn() {
    return !!localStorage.getItem('authToken');
  }

  public logout() {
    localStorage.removeItem('authToken');
    this._router.navigate(['/auth']);
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {
//   registerUrl = "Auth/register"
//   loginUrl = "Auth/login"
//   weatherUrl = "Auth"

//   constructor(private http: HttpClient) { }

//   public register(user: Register): Observable<JwtAuth> {
//     return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.registerUrl}`, user);
//   }
// }

