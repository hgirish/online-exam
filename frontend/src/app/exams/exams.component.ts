import * as Auth0 from 'auth0-web';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Exam } from './exam.model';
import { ExamsApiService } from './exams-api.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, OnDestroy {
  examsListSub: Subscription;
  examsList: Exam[];
  authenticated = false;

  constructor(private examsApi: ExamsApiService) {}

  ngOnInit() {
    this.examsListSub = this.examsApi.getExams().subscribe(res => {
      this.examsList = res;
    }, console.error);
    const self = this;
    Auth0.subscribe(authenticated => (self.authenticated = authenticated));
  }

  ngOnDestroy() {
    this.examsListSub.unsubscribe();
  }
}
