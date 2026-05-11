import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  DisciplineAhpStateDto,
  PairwiseRatiosRequest,
  TaughtDisciplineDto,
} from '../interfaces/discipline-ahp';

@Injectable({
  providedIn: 'root',
})
export class DisciplineAhpService {
  private readonly base = `${environment.apiUrl}/discipline`;

  constructor(private http: HttpClient) {}

  listTaughtDisciplines(): Observable<TaughtDisciplineDto[]> {
    return this.http.get<TaughtDisciplineDto[]>(`${this.base}/taught-disciplines`);
  }

  getAhpState(disciplineId: string): Observable<DisciplineAhpStateDto> {
    return this.http.get<DisciplineAhpStateDto>(`${this.base}/${disciplineId}/ahp`);
  }

  submitJudgment(disciplineId: string, body: PairwiseRatiosRequest): Observable<DisciplineAhpStateDto> {
    return this.http.post<DisciplineAhpStateDto>(`${this.base}/${disciplineId}/ahp/judgment`, body);
  }

  deleteMyJudgment(disciplineId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${disciplineId}/ahp/judgment`);
  }
}
