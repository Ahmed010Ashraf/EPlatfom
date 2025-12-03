import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExamService } from '../../app/Services/examService/exam-service';
import { AllExamsResponse } from '../exam-details/exam-details';

@Component({
  selector: 'app-exams',
  imports: [RouterLink],
  templateUrl: './exams.html',
  styleUrl: './exams.css'
})
export class Exams implements OnInit {

  constructor(private _ExamService:ExamService){}

  Exams !: AllExamsResponse[]
  ngOnInit(): void {
    this._ExamService.GetAllExams().subscribe(res=>{
      this.Exams = res
      console.log(res);
      console.log(this.Exams);
    })
  }
}
