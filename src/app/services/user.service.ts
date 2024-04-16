import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsersBySubstringName(substringName: string) : Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/User/${substringName}`);
  }
}
