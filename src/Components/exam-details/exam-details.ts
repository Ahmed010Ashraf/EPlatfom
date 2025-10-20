import { NgClass, NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface ExamQuestion {
  id: number;
  text: string;
  choices: ExamChoice[];
}

export interface ExamChoice {
  id: number;
  text: string;
}

export interface ExamDetailss {
  id: number;
  title: string;
  durationInMinutes: number;
  startDate: Date;
  questions: ExamQuestion[];
}

export interface StudentAnswerRequest {
  questionId: number;
  choiceId: number | null; // null لو الطالب ما جاوبش
}

export interface SubmitExamRequest {
  examId: number;
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


  //start the exam
  ngOnInit(): void {
    //test data
    this.exam = {
      id: 1,
      title: 'امتحان أساسيات البرمجة',
      durationInMinutes: 1,
      startDate: new Date(),
      questions: [
        {
          id: 1,
          text: 'ما هو نوع البيانات الذي يستخدم لتخزين النصوص في C#؟',
          choices: [
            { id: 11, text: 'int' },
            { id: 12, text: 'string' },
            { id: 13, text: 'bool' },
            { id: 14, text: 'char' },
          ],
        },
        {
          id: 2,
          text: 'أي من التالي يستخدم لتنفيذ شرط معين؟',
          choices: [
            { id: 21, text: 'if' },
            { id: 22, text: 'for' },
            { id: 23, text: 'while' },
            { id: 24, text: 'switch' },
          ],
        },
        {
          id: 3,
          text: 'أي كلمة تُستخدم لتعريف دالة جديدة؟',
          choices: [
            { id: 31, text: 'new' },
            { id: 32, text: 'void' },
            { id: 33, text: 'class' },
            { id: 34, text: 'function' },
          ],
        },
      ],
    };

    if(localStorage.getItem("exam_answers")!=null){
      this.answers = JSON.parse(localStorage.getItem("exam_answers")!);
    }
    else {
      this.answers = this.exam.questions.map((q)=>{
        return ({
          questionId : q.id,
          choiceId : null
        })
      })
    }
    this.startTimer();
  }


  //handle the timer
  startTimer(){
    let AllSec = this.exam.durationInMinutes * 60;
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
    return this.exam.questions[this.currentIndex];
  }


  //prev question
  prevQuestion(){
    if(this.currentIndex > 0 ){
      this.currentIndex--;
    }
  }

  //next question 
  nextQuestion(){
    if(this.currentIndex < this.exam.questions.length -1){
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
    return ans?.choiceId;
  }


  //when user change his selected choice 
  selectChoice(qid:number , cid:number){
    let ans = this.answers.find(a=>a.questionId==qid);
    if(ans){
      ans.choiceId = cid
    }
    localStorage.setItem('exam_answers', JSON.stringify(this.answers));
  }

  submitExam(){
    let ExamAnswers :SubmitExamRequest  = {
      examId : this.exam.id,
      answers : this.answers
    }

    localStorage.removeItem("Timer");
    localStorage.removeItem("exam_answers");
    clearInterval(this.timerInterval);
    console.log(ExamAnswers);
    
    alert("exam send succeflly");
  }
}

