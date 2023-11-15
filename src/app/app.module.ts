import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavMenuComponent } from './components/shared/nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListSubjectsComponent } from './components/shared/list-subjects/list-subjects.component';
import { SubjectsComponent } from './components/pages/subjects/subjects.component';
import { MiniNavMenuComponent } from './components/shared/mini-nav-menu/mini-nav-menu.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ListSubjectsComponent,
    SubjectsComponent,
    MiniNavMenuComponent,
    MainLayoutComponent,
    LoginComponent
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
