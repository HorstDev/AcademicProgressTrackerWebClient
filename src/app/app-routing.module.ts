import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/pages/login/login.component';
import { TeacherLabManagementComponent } from './components/pages/teacher-lab-management/teacher-lab-management.component';
import { LabCreationComponent } from './components/pages/lab-creation/lab-creation.component';
import { LabStatusesComponent } from './components/pages/lab-statuses/lab-statuses.component';
import { TeacherLessonTrackerComponent } from './components/pages/teacher-lesson-tracker/teacher-lesson-tracker.component';
import { GroupManagementComponent } from './components/pages/group-management/group-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirect для '/' на '/subjects'

  { path: '', component: MainLayoutComponent, children: [
    { path: 'lab-management', component: TeacherLabManagementComponent, children: [
      {path: 'lab-creation/:subjectId', component: LabCreationComponent },
      {path: 'lab-statuses/:subjectId', component: LabStatusesComponent },
    ] }, 
    { path: 'lesson-tracker', component: TeacherLessonTrackerComponent },
    { path: 'group-management', component: GroupManagementComponent },
  ] }, 
  { path: 'login', component: LoginComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
