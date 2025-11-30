import { Component, OnInit } from '@angular/core';
import { AllCourses, ControlPannaleService } from '../../../app/Services/ControlPanaleService/control-pannale-service';
import { FormsModule } from '@angular/forms';
import { Environment } from '../../../app/Environments/environment';

@Component({
  selector: 'app-control-course-component',
  imports: [FormsModule],
  templateUrl: './control-course-component.html',
  styleUrl: './control-course-component.css'
})
export class ControlCourseComponent implements OnInit {

  constructor(private _service : ControlPannaleService) { }

  courses : AllCourses[] = [];
  levels : any[]=[];
  showAddCourseModal: boolean = false;
  showUpdateCourseModal: boolean = false;
  coureid!:number;
  newCourse = {

  title:        "",
  description:  "",
  levelFK:      0
  }

  imgurl:string|null = "";

  ngOnInit(): void {

    this._service.getAllCourses().subscribe({
      next:(res)=>{
        console.log(res);
        this.courses = res;
      },
      error:(err)=>{
        console.log(err);
      }
    });


    this._service.getAllLevels().subscribe({
      next:(res)=>{
        console.log(res);
        this.levels = res;
      },
      error(err) {
        console.log(err);
        
      },
    })


    
  }
  
  deleteCourse(id:number){
    this._service.deleteCourse(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.courses = this.courses.filter(c => c.id !== id);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  
}


updateCourse(id:number){


  
  this.showUpdateCourseModal = true;
  
  this._service.getCourseById(id).subscribe({
    
    next:(res)=>{
      console.log(res);
      this.newCourse.title = res.title;
      this.newCourse.description = res.description;
      this.newCourse.levelFK = res.levelFK;
      this.imgurl =res.imageUrl;
      this.coureid = res.id;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })

   
}

updatecourse(id:number){
  
      let courseData = new FormData();
  courseData.append('Title', this.newCourse.title);
  courseData.append('Description', this.newCourse.description);
  courseData.append('LevelFK', this.newCourse.levelFK.toString());
  if(this.img != null){
    courseData.append('ImageUrl', this.img);
  }

  courseData.append("ImgUrl" , this.imgurl!);
  console.log(courseData);
  

  this._service.updateCourse(id,courseData).subscribe({
    next:(res)=>{
      console.log(res);
        this._service.getAllCourses().subscribe({
      next:(res)=>{
        console.log(res);
        this.courses = res;
      },
      error:(err)=>{
        console.log(err);
      }
    });
      this.showUpdateCourseModal = false;
    },
    error:(err)=>{
      console.log(err);
      this.showUpdateCourseModal = false;
    }
  });

}


img:any = null;
setimage(event:any){
  const file:File = event.target.files[0];
  if(event.target.files && event.target.files.length > 0) {
    this.img = file;
  }
   else {
    this.img = null;
   }
}

createCourse(){

  let courseData = new FormData();
  courseData.append('Title', this.newCourse.title);
  courseData.append('Description', this.newCourse.description);
  courseData.append('LevelFK', this.newCourse.levelFK.toString());
  courseData.append('ImageUrl', this.img);

this._service.addCourse(courseData).subscribe({
  next:(res)=>{
    console.log(res);
    this.courses.push(res);
    this.showAddCourseModal = false;
  },
  error:(err)=>{
    console.log(err);
  }
});

this.showAddCourseModal = false;
}





}
