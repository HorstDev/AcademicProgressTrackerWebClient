import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { Group } from 'src/app/models/group';
import { Profile } from 'src/app/models/user';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about-group',
  templateUrl: './about-group.component.html',
  styleUrls: ['./about-group.component.scss']
})
export class AboutGroupComponent implements OnInit {
  // Autocomplete
  selectedTeacherName?: string;
  myControl = new FormControl('');
  teacherProfiles: Profile[] = [];
  filteredTeacherProfiles?: Observable<Profile[]>;

  // Other
  groupId: string = '';
  group: Group | null = null;

  constructor(private _route: ActivatedRoute, private _userService: UserService,
    private _groupService: GroupService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.setGroup();
    });

    // this.filteredTeacherProfiles = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   debounceTime(500), // Ожидание ввода в течение 2 секунд
    //   switchMap(value => this.setTeacherProfiles(value || '')), // Вызов метода для запроса на сервер и получения нового списка
    // );
  }

  setTeacherProfiles(value: string): Observable<Profile[]> {
    return this._userService.getTeacherProfilesBySubstringName(value).pipe(
      map((teacherProfilesFromServer: Profile[]) => {
        return teacherProfilesFromServer;
      }),
      catchError((err) => {
        console.error('Error fetching teacher profiles:', err);
        return of([]); // Возвращаем пустой массив в случае ошибки
      })
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    // Получаем выбранное значение (ID преподавателя)
    this.selectedTeacherName = event.option.value;
  }

  setGroup() {
    if (!this.groupId) {
      
    } else {
      this._groupService.getGroupById(this.groupId).subscribe({
        next: (groupFromServer: Group) => {
          this.group = groupFromServer;
        },
        error: (err) => {
          
        },
        complete: () => {
          
        }
      });  
    } 
  }
}
