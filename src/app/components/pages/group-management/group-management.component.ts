import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  groupNameToAdd: string | null = null;
  curriculumFileToAdd: File | null = null;

  groups: Group[] = [];
  selectedDate: Date | null = null;
  selectedGroupId: string = '';
  currentDate: Date = new Date();

  constructor(private snackBar: MatSnackBar, private _groupService: GroupService, private dialog: MatDialog, private _router: Router) {}

  ngOnInit(): void {
    this.setGroups()
  }

  onFileSelected(event: any) {
    this.curriculumFileToAdd = event.target.files[0];
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
  }

  addNewGroup() {
    if (this.groupNameToAdd && this.curriculumFileToAdd) {
      this._groupService.createGroup(this.groupNameToAdd, this.curriculumFileToAdd).subscribe({
        next: () => {
          this.openSnackBar('Успешно добавлено!', 'Ок');
          this.setGroups()
        },
        error: (err) => {
          
        },
        complete: () => {
          
        }
      });     
    }
    else {
      this.openSnackBar('Ошибка! Не все поля заполнены!', 'Ок');
    }
  }

  setGroups() {
    this._groupService.getAllGroups().subscribe({
      next: (groupsFromServer: Group[]) => {
        this.groups = groupsFromServer;
      },
      error: (err) => {
        
      },
      complete: () => {
        
      }
    });     
  }

  uploadDependenciesForSelectedGroup() {
    if (this.selectedDate == null) {
      this.openSnackBar('Ошибка! Не выбрана дата!', 'Ок');
    }
    else {
      this.dialog.closeAll();

      this._groupService.uploadDependenciesForGroup(this.selectedGroupId).subscribe({
        next: () => {
          this.openSnackBar('Успешно загружено!', 'Ок');
          this.setGroups();
        },
        error: (err) => {
          this.openSnackBar(err.error.message, 'Ок');
        },
        complete: () => {
          
        }
      }); 
    }
  }

  navigateToAboutGroupPage(groupId: string) {
    this._router.navigate(['/group-management/about-group/' + groupId]);
  }

  openDialog(groupId: string): void {
    this.selectedGroupId = groupId;

    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '250px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Обработка закрытия диалога
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
