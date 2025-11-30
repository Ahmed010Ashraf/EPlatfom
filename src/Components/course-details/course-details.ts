import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlPannaleService, CourseByID } from '../../app/Services/ControlPanaleService/control-pannale-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  imports: [FormsModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {

Code:any;
  constructor(private _route:ActivatedRoute , private _service:ControlPannaleService , private _router:Router){}

  courseid !: number;
  course !: CourseByID;
  Lessons:any;
  isUserSubscribed :boolean = false;
  errorInCode :boolean = false;
  ngOnInit(): void {
    this._route.paramMap.subscribe(param=>{
      this.courseid = Number(param.get('id'));
      console.log(this.courseid);



      this._service.getCourseById(this.courseid).subscribe(res=>{
        this.course = res;
      })
      



      this._service.GetLessonsByCourseId(this.courseid).subscribe(res=>{
        console.log(res);
        this.Lessons = res;
        
      })



      this._service.CheckEnrollment(this.courseid).subscribe(res=>{
        console.log(`user is enrolled in this course = ${res}`);
        this.isUserSubscribed = res;
      })
    })
  } 


  GoToLesson(id:any){
    this._router.navigate(["Lesson",id]);
  }



  subscribeToCourse(){
    if(this.Code && this.courseid){
      this._service.AddUserToCourse(this.courseid,this.Code).subscribe({
        next:(res)=>{
          console.log(res);
          this.isUserSubscribed = true;
          this.errorInCode = false;
          
        },
        error:(err)=>{
          console.log(err);
          this.errorInCode = true;
        }

      })
    }
  }
}
