import { NgClass, NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../app/Services/examService/exam-service';


export interface ExamQuestion {
  id: number;
  text: string;
  choices: ExamChoice[];
}


export interface ExamChoice {
  id: number;
  text: string;
}





export interface Option{
id:number;
text:string;
isCorrect:boolean;
questionId:number
}

export interface Question{
id:number;
title:string;
picUrl:string | null;
examId:number;
options:Option[];
}


export interface AllExamsResponse {
  id: number;
  title: string;
  duration: number;
  startTime: Date;
  isAvaliable: boolean;
}



export interface ExamDetailss {
  title: string;
  duration: number;
  questions: Question[];
}









export interface StudentAnswerRequest {
  questionId: number;
  answerId: number | null; 
}

export interface SubmitExamRequest {
  examId: number;
  sendDate:Date;
  answers: StudentAnswerRequest[];
}



@Component({
  selector: 'app-exam-details',
  imports: [NgFor , NgClass , FormsModule  ],
  templateUrl: './exam-details.html',
  styleUrl: './exam-details.css'
})
export class ExamDetails {
exam!: ExamDetailss;
  currentIndex = 0;
  answers !: StudentAnswerRequest[];
  minutes = 0;
  seconds = 0;
  timerInterval: any;
  examid !: number;
  diableButton:boolean = true;
  gradePage:boolean = false;
  loodSend:boolean=false;
  pageloader:boolean=true;


 
  constructor(private route: ActivatedRoute , private _ExamService:ExamService , private _router : Router) {
   
    
  }

  //start the exam
  ngOnInit(): void {


    
     this.route.paramMap.subscribe(params => {
      this.examid = Number(params.get('id')!);
        this._ExamService.GetExamById(this.examid).subscribe({
      next:(res)=>{
        console.log(res);
        this.exam=res;
        this.pageloader = false;
         if(localStorage.getItem("exam_answers")!=null){
      this.answers = JSON.parse(localStorage.getItem("exam_answers")!);
    }
    
    else {
      this.answers = this.exam.questions.map((q)=>{
        return ({
          questionId : q.id,
          answerId : null
        })
      })
    }
    this.startTimer();
    this.diableButton = false;
      },
      error:(err)=>{console.log(err);
      }
    })
    });
    
  

   
    

   
  }


  //handle the timer
  startTimer(){
    let AllSec = this.exam.duration * 60;
    if(localStorage.getItem("Timer")!=null){
      AllSec = JSON.parse(localStorage.getItem("Timer")!);
    }
     this.minutes = Math.floor(AllSec / 60);
     this.seconds = AllSec%60;
     this.timerInterval = setInterval(() => {
      AllSec--;
      localStorage.setItem("Timer",JSON.stringify(AllSec));
      if(AllSec <= 0){
        clearInterval(this.timerInterval);
        this.submitExam();
      }
      this.minutes = Math.floor(AllSec / 60);
      this.seconds = AllSec%60;
     }, 1000);
  }

  //handle the cur question 
  get currentQuestion(){
    return this.exam?.questions[this.currentIndex];
  }


  //prev question
  prevQuestion(){
    if(this.currentIndex > 0 ){
      this.currentIndex--;
    }
  }

  //next question 
  nextQuestion(){
    if(this.currentIndex < this.exam?.questions.length -1){
      this.currentIndex++;
    }
  }



  // go to question
  goToQuestion(i:number){
    this.currentIndex = i;
  }


  //get user answer by question id 
  GetUserAnswerByQuestionId(Qid : number){
    let ans = this.answers.find(a => a.questionId == Qid);
    return ans?.answerId;
  }


  //when user change his selected choice 
  selectChoice(qid:number , cid:number){
    let ans = this.answers.find(a=>a.questionId==qid);
    if(ans){
      ans.answerId = cid
    }
    localStorage.setItem('exam_answers', JSON.stringify(this.answers));
  }



  ExamAnswers!:SubmitExamRequest;
  grade!:number;

  submitExam(){
    this.loodSend = true;
     this.ExamAnswers   = {
      examId : this.examid,
      sendDate:new Date(),
      answers : this.answers,
    }

    localStorage.removeItem("Timer");
    localStorage.removeItem("exam_answers");
    clearInterval(this.timerInterval);
    console.log(this.ExamAnswers);
    this._ExamService.SendExam(this.ExamAnswers).subscribe({
      next:(res)=>{console.log(res);
        this.grade = res.grade;
      },
      error:(err)=>console.log(err)
      
    });
    
    this.loodSend = false;
    alert("exam send succeflly");

    this.gradePage = true;

  }



  BackToMainPage(){
    this._router.navigate(['Exams'])
  }
}

