import { Component, OnInit } from '@angular/core';
import { ControlPannaleService, GotLesson } from '../../../app/Services/ControlPanaleService/control-pannale-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-lect-component',
  imports: [FormsModule],
  templateUrl: './control-lect-component.html',
  styleUrl: './control-lect-component.css'
})
export class ControlLectComponent  {

  constructor(private _serviec:ControlPannaleService){}

  AllLessons : GotLesson[]=[];
  Lesson!:GotLesson;
  showAddLectModel :boolean = false;
  showUpdateLectModel :boolean = false;
  title:string = "";
  desc:string="";
  img:any = null;
  docName:string="doc1";
  courseId:number=0;
  videos:string[]=[];
  video : string ="";
  allCourses:any;
  checkImg : string|null =null;
  idforUpdate!:number;
  ngOnInit(): void {
    this._serviec.getAllLessons().subscribe({
      next:(res)=>{
        console.log(res);
        this.AllLessons = res;
        
      }
    })


    this._serviec.getAllCourses().subscribe({
      next:(res)=>{
        this.allCourses = res;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }






setimage(event:any){
  const file:File = event.target.files[0];
  if(event.target.files && event.target.files.length > 0) {
    this.img = file;
  }
   else {
    this.img = null;
   }
}


  deleteLect(id:number){
this._serviec.deleteLesson(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.AllLessons = this.AllLessons.filter(l=>l.id != id);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  updateLect(id:number){
    this.showUpdateLectModel = true;
    this._serviec.getLessonById(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.title = res.title;
        this.desc = res.description;
        this.docName = res.docName;
        this.courseId = res.courseIdFK;
        this.idforUpdate = res.id;
        this.video = res.videos[0];
        this.checkImg = res.imageName
      },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }

  updateLectById(id:number){
this.videos = [];
this.videos.push(this.video);
    let formData = new FormData();

    formData.append("Title",this.title);
    formData.append("Description",this.desc);
    formData.append("DocName",this.docName);
    formData.append("CourseIdFK",this.courseId.toString());
    this.videos.forEach(v=>{
      formData.append("Videos",v);
    })
    
    if(this.img != null){
      formData.append("ImageName",this.img);
    }

    this._serviec.updateLesson(id,formData ).subscribe({
      next:(res)=>{
        console.log(res);
        this.showUpdateLectModel = false;
        
  this._serviec.getAllLessons().subscribe({
      next:(res)=>{
        console.log(res);
        this.AllLessons = res;
        
      }
    })


      },
      error:(err)=>{
        console.log(err);
        
      }
    })




    this.showUpdateLectModel = false
  }


  createLect(){
    this.videos = [];
    this.videos.push(this.video);
    let formData = new FormData();

    formData.append("Title",this.title);
    formData.append("Description",this.desc);
    formData.append("ImageName",this.img);
    formData.append("DocName",this.docName);
    formData.append("CourseIdFK",this.courseId.toString());
    this.videos.forEach(v=>{
      formData.append("Videos",v);
    })


    this._serviec.addLesson(formData).subscribe({
      next:(res)=>{
        console.log(res);
        this.AllLessons.push(res);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    this.showAddLectModel = false;
  }
}
