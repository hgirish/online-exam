import * as Auth0 from 'auth0-web';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExamsApiService } from './exams/exams-api.service';
import { ExamsComponent } from './exams/exams.component';
import { ExamFormComponent } from './exams/exam-form.component';
import { CallbackComponent } from './callback.component';

const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'new-exam', component: ExamFormComponent },
  { path: '', component: ExamsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ExamsComponent,
    ExamFormComponent,
    CallbackComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [ExamsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'g-mean-rsvp.auth0.com',
      audience: 'https://online-exam.gmh.com',
      clientID: 'ZXflkY4SplEd53eOjsRF8oWByHPlTY6c',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:exams'
    });
  }
}
