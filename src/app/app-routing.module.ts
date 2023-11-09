import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './components/pages/subjects/subjects.component';

const routes: Routes = [
  { path: '', redirectTo: 'subjects', pathMatch: 'full' }, // redirect для '/' на '/groups'
  { path: 'subjects', component: SubjectsComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
