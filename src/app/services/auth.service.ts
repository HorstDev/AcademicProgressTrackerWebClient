import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserLoginData } from '../interfaces/user/user-login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }

  public changeAccountData(authToken: string, user: UserLoginData) : Observable<any> {
    return this.http.put(`${environment.apiUrl}/Auth/change-account-data/${authToken}`,
      user
    )
  }

  public getAuthTokenFor48Hours(userId: string) : Observable<string> {
    return this.http.get(`${environment.apiUrl}/Auth/access-token-48-hours/${userId}`, {responseType: 'text'});
  }

  public register(user: UserLoginData) : Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Auth/register`,
     user
    );
  }

  public login(user: UserLoginData) : Observable<string> {
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

  public removeUser(userId: string) : Observable<any> {
    return this.http.delete(`${environment.apiUrl}/Auth/${userId}`);
  }

  public getRoles() : string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded : any = jwtDecode(token);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return null;
  }

  public getLogin() : string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded : any = jwtDecode(token);
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
    return null;
  }

  public loggedIn() {
    return !!localStorage.getItem('authToken');
  }

  public logout() {
    localStorage.removeItem('authToken');
    this._router.navigate(['/login']);
  }
}

