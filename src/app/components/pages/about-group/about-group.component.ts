import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { Group } from 'src/app/models/group';
import { Subject } from 'src/app/models/subject';
import { Profile } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about-group',
  templateUrl: './about-group.component.html',
  styleUrls: ['./about-group.component.scss']
})
export class AboutGroupComponent implements OnInit {
  // Autocomplete
  myControl = new FormControl('');
  teacherProfiles: Profile[] = [];
  filteredTeacherProfiles?: Observable<Profile[]>;

  // Other
  groupId: string = '';
  group: Group | null = null;
  studentNameToAdd: string = '';
  students: Profile[] = [];
  curator: Profile | null = null;
  subjects: Subject[] = [];

  constructor(private _route: ActivatedRoute, private _userService: UserService,
    private _groupService: GroupService, private snackBar: MatSnackBar, private _authService: AuthService,
    private _subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.setGroup();
      this.setStudentProfiles();
      this.setCuratorProfile();
      this.setSubjects();
    });

    this.filteredTeacherProfiles = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500), // Ожидание ввода в течение 2 секунд
      switchMap(value => this.setTeacherProfiles(value || '')), // Вызов метода для запроса на сервер и получения нового списка
    );
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
    const selectedTeacherId = event.option.value.id;
    console.log(selectedTeacherId);
    this.addCuratorToGroup(selectedTeacherId);
  }

  displayFn(profile: Profile): string {
    return profile ? profile.name : '';
  }

  setGroup() {
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

  setStudentProfiles() {
    this._userService.getStudentProfilesByGroupId(this.groupId).subscribe({
      next: (studentProfilesFromServer: Profile[]) => {
        this.students = studentProfilesFromServer;
      },
      error: (err) => {
        
      },
      complete: () => {
        
      }
    });  
  }

  setSubjects() {
    this._subjectService.getSubjectsByGroupId(this.groupId).subscribe({
      next: (subjectsFromServer: Subject[]) => {
        this.subjects = subjectsFromServer;
      },
      error: (err) => {
        
      },
      complete: () => {
        
      }
    });  
  }

  setCuratorProfile() {
    this._userService.getCuratorProfileByGroupId(this.groupId).subscribe({
      next: (curatorFromServer: Profile) => {
        this.curator = curatorFromServer;
      },
      error: (err) => {
        this.curator = null;
      },
      complete: () => {
        
      }
    });  
  }

  addCuratorToGroup(teacherId: string) {
    this._userService.addCuratorToGroup(teacherId, this.groupId).subscribe({
      next: () => {
        this.setCuratorProfile();
      },
      error: (err) => {
        this.openSnackBar(err.error.message, 'Ок');
      },
      complete: () => {
        
      }
    });  
  }

  addStudentToGroup() {
    if (this.studentNameToAdd === '' || !this.studentNameToAdd) {
      this.openSnackBar('Имя не должно быть пустым!', 'Ок');
      return;
    }
    this._userService.addStudentToGroup(this.studentNameToAdd, this.groupId).subscribe({
      next: (studentProfileFromServer: Profile) => {
        this.students.push(studentProfileFromServer);
        this.openSnackBar('Студент успешно добавлен', 'Ок');
        this.studentNameToAdd = '';
      },
      error: (err) => {
        this.openSnackBar('Ошибка при добавлении', 'Ок');
      },
      complete: () => {
        
      }
    });  
  }

  removeUser(userId: string) {
    this._authService.removeUser(userId).subscribe({
      next: () => {
        this.setStudentProfiles();
      },
      error: (err) => {
        this.openSnackBar('Ошибка при удалении!', 'Ок');
      },
      complete: () => {
        
      }
    });  
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
