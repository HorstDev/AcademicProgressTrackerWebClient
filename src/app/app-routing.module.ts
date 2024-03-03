import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './components/pages/subjects/subjects.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'subjects', pathMatch: 'full' }, // redirect для '/' на '/subjects'

  { path: '', component: MainLayoutComponent, children: [
    { path: 'subjects', component: SubjectsComponent }, 
  ] }, 
  { path: 'login', component: LoginComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
