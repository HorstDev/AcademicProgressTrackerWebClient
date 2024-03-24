import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LabLesson } from '../models/labLesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  public getLabLessons(subjectId : string) : Observable<LabLesson[]> {
    return this.http.get<LabLesson[]>(`${environment.apiUrl}/Lesson/${subjectId}/lab-lessons`);
  }
}
