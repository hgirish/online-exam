import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Exam } from './exam.model';
import { ExamsApiService } from './exams-api.service';

@Component({
  selector: 'exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, OnDestroy {
  examsListSub: Subscription;
  examsList: Exam[];

  constructor(private examsApi: ExamsApiService) {}

  ngOnInit() {
    this.examsListSub = this.examsApi.getExams().subscribe(res => {
      this.examsList = res;
    }, console.error);
  }

  ngOnDestroy() {
    this.examsListSub.unsubscribe();
  }
}
