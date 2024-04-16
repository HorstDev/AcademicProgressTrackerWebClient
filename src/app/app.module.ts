import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavMenuComponent } from './components/shared/nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListSubjectsComponent } from './components/shared/list-subjects/list-subjects.component';
import { MiniNavMenuComponent } from './components/shared/mini-nav-menu/mini-nav-menu.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/pages/login/login.component';
import { TeacherLabManagementComponent } from './components/pages/teacher-lab-management/teacher-lab-management.component';
import { LabCreationComponent } from './components/pages/lab-creation/lab-creation.component';
import { DialogChoosingSubjectComponent } from './components/shared/dialog-choosing-subject/dialog-choosing-subject.component';
import { LabStatusesComponent } from './components/pages/lab-statuses/lab-statuses.component';
import { TeacherLessonTrackerComponent } from './components/pages/teacher-lesson-tracker/teacher-lesson-tracker.component';
import { GroupManagementComponent } from './components/pages/group-management/group-management.component';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { ChangingAccountDataComponent } from './components/pages/changing-account-data/changing-account-data.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ListSubjectsComponent,
    MiniNavMenuComponent,
    MainLayoutComponent,
    LoginComponent,
    TeacherLabManagementComponent,
    LabCreationComponent,
    DialogChoosingSubjectComponent,
    LabStatusesComponent,
    TeacherLessonTrackerComponent,
    GroupManagementComponent,
    UserManagementComponent,
    ChangingAccountDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // angular materials
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatListModule,
    MatSnackBarModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
    MatSnackBarModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
