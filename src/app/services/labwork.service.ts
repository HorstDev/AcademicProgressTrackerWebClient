import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LabWork } from '../models/labWork';

@Injectable({
  providedIn: 'root'
})
export class LabworkService {

  constructor(private http: HttpClient) { }

  public getLabWorks(subjectId: string) : Observable<LabWork[]> {
    return this.http.get<LabWork[]>(`${environment.apiUrl}/LabWork/${subjectId}/get-many`);
  }

  public createLab(newLab: any) : Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/LabWork`,
    newLab);
  }

  public deleteLab(labWorkId: string) : Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/LabWork/${labWorkId}`);
  }
}
