import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExamsApiService } from './exams-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {
  exam = {
    title: '',
    description: ''
  };

  constructor(private examsApi: ExamsApiService, private router: Router) {}

  ngOnInit() {}

  updateTitle(event: any) {
    this.exam.title = event.target.value;
  }
  updateDescription(event: any) {
    this.exam.description = event.target.value;
  }

  saveExam() {
    this.examsApi
      .saveExam(this.exam)
      .subscribe(
        () => this.router.navigate(['/']),
        error => console.error(error.message)
      );
  }
}
