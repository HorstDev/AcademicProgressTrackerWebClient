import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './components/pages/subjects/subjects.component';
import { LoginAndRegisterComponent } from './components/pages/login-and-register/login-and-register.component';

const routes: Routes = [
  { path: '', redirectTo: 'subjects', pathMatch: 'full' }, // redirect для '/' на '/groups'
  { path: 'subjects', component: SubjectsComponent }, 
  { path: 'auth', component: LoginAndRegisterComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
