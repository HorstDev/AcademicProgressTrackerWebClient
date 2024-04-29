import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubjectMapping } from 'src/app/models/subject-mapping';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject-mapping',
  templateUrl: './subject-mapping.component.html',
  styleUrls: ['./subject-mapping.component.scss']
})
export class SubjectMappingComponent implements OnInit {
  subjectNameApiTableToAdd: string = '';
  subjectNameCurriculumToAdd?: string;
  subjectMappingToUpdate?: SubjectMapping;

  subjectMappings: SubjectMapping[] = [];

  constructor(private _subjectService: SubjectService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.setAllSubjectMappings();
  }

  setAllSubjectMappings(): void {
    this._subjectService.getAllSubjectMappings().subscribe({
      next: (subjectMappingsFromServer: SubjectMapping[]) => {
        this.subjectMappings = subjectMappingsFromServer;
      },
      error: (err) => {
        this.openSnackBar('Ошибка при получении', 'Ок');
      },
      complete: () => {

      }
    });     
  }

  addSubjectMapping(): void {
    const newSubjectMapping = {
      subjectNameApiTable: this.subjectNameApiTableToAdd,
      subjectNameCurriculum: this.subjectNameCurriculumToAdd,
    }

    this._subjectService.addSubjectMapping(newSubjectMapping).subscribe({
      next: () => {
        this.openSnackBar('Успешно добавлено!', 'Ок');
        this.setAllSubjectMappings();
      },
      error: (err) => {
        this.openSnackBar('Ошибка при добавлении', 'Ок');
      },
      complete: () => {

      }
    });   
  }

  updateSubjectMapping(): void {
    if (this.subjectMappingToUpdate) {
      const newSubjectMapping = {
        id: this.subjectMappingToUpdate.id,
        subjectNameApiTable: this.subjectMappingToUpdate.subjectNameApiTable,
        subjectNameCurriculum: this.subjectMappingToUpdate.subjectNameCurriculum,
      }

      this._subjectService.updateSubjectMapping(newSubjectMapping).subscribe({
        next: (subjectMappingFromServer: SubjectMapping) => {
          this.openSnackBar('Успешно обновлено!', 'Ок');
        },
        error: (err) => {
          this.openSnackBar('Ошибка при обновлении', 'Ок');
        },
        complete: () => {
  
        }
      });   
    }
  }

  deleteSubjectMapping(subjectMappingId: string): void {
    this._subjectService.deleteSubjectMapping(subjectMappingId).subscribe({
      next: () => {
        this.setAllSubjectMappings();
      },
      error: (err) => {
        this.openSnackBar('Ошибка при удалении', 'Ок');
      },
      complete: () => {

      }
    });     
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
