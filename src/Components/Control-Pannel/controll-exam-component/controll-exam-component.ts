import { Component, OnInit } from '@angular/core';
import { ControlPannaleService, CreateExamDto, ExamOption, ExamQuestion } from '../../../app/Services/ControlPanaleService/control-pannale-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controll-exam-component',
  imports: [FormsModule],
  templateUrl: './controll-exam-component.html',
  styleUrl: './controll-exam-component.css'
})
export class ControllExamComponent implements OnInit {

  constructor(private _service:ControlPannaleService) { }

  questionsList:ExamQuestion[] = [];

  // AnsewerOptions:ExamOption[]=[];

  lectid : number|null = null;
  courseid : number|null = null;


  courses :any[]=[];
  lects :any[]=[];

ngOnInit(): void {
    this._service.getAllCourses().subscribe({
      next:(res)=>{
        console.log(res);
        this.courses = res;
      },
      error:(err)=>{
        console.log(err);
      }});
    
    
    this._service.getAllLessons().subscribe({
      next:(res)=>{
        console.log(res);
        this.lects = res;
      },
      error:(err)=>{
        console.log(err);
      }
      });
    }



  addQuestion(){
    this.questionsList.push({
      title: '',
      options: [
        { text: '', isCorrect: false },
      ]
    })
  }


  addOption(questionId:number){
    this.questionsList[questionId].options.push({
       text: '',
      isCorrect: false
    })
  }


  setCorrectOption(questionId:number,optionId:number){
    this.questionsList[questionId].options.forEach((option, index) => {
      option.isCorrect = (index === optionId);
    });
  }


  removeQuestion(questionId:number){
    this.questionsList.splice(questionId,1);
  }


  removeOption(questionId:number,optionId:number){
    this.questionsList[questionId].options.splice(optionId,1);
  }





duration: number=0;
  title: string ="";
  startTime: string =""; 
  messageAfterSaveExam !: String ;

  sendExamData(){
    const examData:CreateExamDto = {
      courseId: this.courseid == 0?null:Number(this.courseid),
      lessonId: this.lectid == 0?null:Number(this.lectid),
      duration: this.duration,
      title: this.title,
      startTime: new Date(this.startTime).toISOString(),
      questions: this.questionsList
    };



    this._service.createExam(examData).subscribe({
      next:(res)=>{
        console.log(res);
        this.messageAfterSaveExam = "Exam Created Successfully!";
      },
      error:(err)=>{
        console.log(err);
        this.messageAfterSaveExam = "Error Creating Exam.";
      }
    });

    console.log(examData);



}
}
