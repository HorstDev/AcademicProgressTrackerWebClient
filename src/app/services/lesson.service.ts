import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LabLesson } from '../models/labLesson';
import { Lesson } from '../models/lesson';
import { DatePipe } from '@angular/common';
import { LessonUserStatusesData } from '../interfaces/lesson-user-statuses-data';
import { LessonUserStatusData } from '../interfaces/lesson-user-status-data';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public getLabLessons(subjectId : string) : Observable<LabLesson[]> {
    return this.http.get<LabLesson[]>(`${environment.apiUrl}/Lesson/${subjectId}/lab-lessons`);
  }

  public getCurrentLessons() : Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${environment.apiUrl}/Lesson/current-lessons`);
  }

  public getLessonUserStatusesInProgress() : Observable<LessonUserStatusesData[]> {
    return this.http.get<LessonUserStatusesData[]>(`${environment.apiUrl}/Lesson/lessons-in-progress-user-statuses`);
  }

  public getLessonsInDay(date: Date) : Observable<Lesson[]> {
    const dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.http.get<Lesson[]>(`${environment.apiUrl}/Lesson/lessons-in-date/${dateString}`);
  }

  public startLessons(lessons: Lesson[]) : Observable<Lesson[]> {
    return this.http.put<Lesson[]>(`${environment.apiUrl}/Lesson/start-lessons`,
    lessons
    );
  }

  public stopLessons(lessons: Lesson[]) : Observable<Lesson[]> {
    return this.http.put<Lesson[]>(`${environment.apiUrl}/Lesson/stop-lessons`,
    lessons
    );
  }

  public updateLessonStatuses(lessonStatuses: LessonUserStatusData[]) : Observable<LessonUserStatusData[]> {
    return this.http.put<LessonUserStatusData[]>(`${environment.apiUrl}/Lesson/update-lesson-statuses`,
    lessonStatuses
    );
  }
}
