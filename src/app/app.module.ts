import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/shared/nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListSubjectsComponent } from './components/shared/list-subjects/list-subjects.component';
import { SubjectsComponent } from './components/pages/subjects/subjects.component';
import { MiniNavMenuComponent } from './components/shared/mini-nav-menu/mini-nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ListSubjectsComponent,
    SubjectsComponent,
    MiniNavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // angular materials
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
