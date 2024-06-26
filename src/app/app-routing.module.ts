import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/pages/login/login.component';
import { TeacherLabManagementComponent } from './components/pages/teacher-lab-management/teacher-lab-management.component';
import { LabCreationComponent } from './components/pages/lab-creation/lab-creation.component';
import { LabStatusesComponent } from './components/pages/lab-statuses/lab-statuses.component';
import { TeacherLessonTrackerComponent } from './components/pages/teacher-lesson-tracker/teacher-lesson-tracker.component';
import { GroupManagementComponent } from './components/pages/group-management/group-management.component';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { ChangingAccountDataComponent } from './components/pages/changing-account-data/changing-account-data.component';
import { QrCodeViewerComponent } from './components/pages/qr-code-viewer/qr-code-viewer.component';
import { SubjectMappingComponent } from './components/pages/subject-mapping/subject-mapping.component';
import { AboutGroupComponent } from './components/pages/about-group/about-group.component';
import { ReportGroupComponent } from './components/pages/report-group/report-group.component';
import { ReportStudentComponent } from './components/pages/report-student/report-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirect для '/' на '/subjects'

  { path: '', component: MainLayoutComponent, children: [
    { path: 'lab-management', component: TeacherLabManagementComponent, children: [
      {path: 'lab-creation/:subjectId', component: LabCreationComponent },
      {path: 'lab-statuses/:subjectId', component: LabStatusesComponent },
    ] }, 
    { path: 'lesson-tracker', component: TeacherLessonTrackerComponent },
    { path: 'group-management/about-group/:groupId', component: AboutGroupComponent },
    { path: 'group-management', component: GroupManagementComponent },
    { path: 'user-management', component: UserManagementComponent },
    { path: 'qr-ticket', component: QrCodeViewerComponent },
    { path: 'subject-mapping', component: SubjectMappingComponent },
    { path: 'report-group', component: ReportGroupComponent },
    { path: 'report-student', component: ReportStudentComponent },
  ] }, 
  { path: 'login', component: LoginComponent },
  { path: 'changing-account-data', component: ChangingAccountDataComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
