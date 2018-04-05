import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExamsApiService } from './exams/exams-api.service';
import { ExamsComponent } from './exams/exams.component';
import { ExamFormComponent } from './exams/exam-form.component';

const appRoutes: Routes = [
  { path: 'new-exam', component: ExamFormComponent },
  { path: '', component: ExamsComponent }
];

@NgModule({
  declarations: [AppComponent, ExamsComponent, ExamFormComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [ExamsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
