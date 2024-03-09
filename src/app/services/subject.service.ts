import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  public getTaugthSubjects() : Observable<Subject[]> {
    var subjects = this.http.get<Subject[]>(`${environment.apiUrl}/Subject/taught-subjects`);
    return this.http.get<Subject[]>(`${environment.apiUrl}/Subject/taught-subjects`);
  }
}
