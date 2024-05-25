import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  public getAllGroups() : Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrl}/Group/all-groups`);
  }

  public getFiveGroupsBySubstring(substring: string) : Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrl}/Group/groups-by-substring/${substring}`);
  }

  public getGroupById(id: string) : Observable<Group> {
    return this.http.get<Group>(`${environment.apiUrl}/Group/${id}`);
  }

  public getSupervisedGroups() : Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrl}/Group/supervised-groups`);
  }

  public createGroup(groupName: string, curriculumFile: File) : Observable<any> {
    const formData = new FormData();
    formData.append('excelCurriculum', curriculumFile)

    // Без кодировки groupName запрос не отправится, т.к. в groupName есть /
    const encodedGroupName = encodeURIComponent(groupName);

    return this.http.post<any>(`${environment.apiUrl}/Group/${encodedGroupName}`,
    formData);
  }

  public uploadDependenciesForGroup(groupId: string) : Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Group/${groupId}/upload-dependencies`, { });
  }
}
