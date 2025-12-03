import { Component, OnInit } from '@angular/core';
import { ControlPannaleService } from '../../../../app/Services/ControlPanaleService/control-pannale-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contorl-level-component',
  imports: [FormsModule],
  templateUrl: './contorl-level-component.html',
  styleUrl: './contorl-level-component.css'
})
export class ContorlLevelComponent implements OnInit {
  constructor(private _service : ControlPannaleService) { }

  Levels : any[] = [];
  showAddCourseModal: boolean = false;
  showUpdateCourseModal: boolean = false;
  levelid!:number;
  newLevel = {

  name:        "",
  academicYear:  "",
  levelNumber:      0,
  numberOfStudents:0
  }

  imgurl:string|null = "";

  ngOnInit(): void {

    this._service.GetAllLevels().subscribe({
      next:(res)=>{
        console.log(res);
        this.Levels = res;
      },
      error:(err)=>{
        console.log(err);
      }
    });


    
  }
  
  deletelevel(id:number){
    this._service.DeletLevel(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.Levels = this.Levels.filter(c => c.id !== id);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  
}


updatelevel(id:number){


  
  this.showUpdateCourseModal = true;
  
  this._service.GetLevelById(id).subscribe({
    
    next:(res)=>{
      console.log(res);
      this.newLevel.name = res.name;
      this.newLevel.academicYear = res.academicYear;
      this.newLevel.levelNumber = res.levelNumber;
      this.newLevel.numberOfStudents = res.numberOfStudents;
      this.imgurl =res.picUrl;
      this.levelid = res.id;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })

   
}

updateLevel(id:number){
  
      let levelData = new FormData();
  levelData.append('name', this.newLevel.name);
  levelData.append('academicYear', this.newLevel.academicYear);
  levelData.append('levelNumber', this.newLevel.levelNumber.toString());
  levelData.append('numberOfStudents', this.newLevel.numberOfStudents.toString());
  if(this.img != null){
    levelData.append('picUrl', this.img);
  }

  levelData.append("picUrl" , this.imgurl!);
  console.log(levelData);
  

  this._service.UpdateLevel(id,levelData).subscribe({
    next:(res)=>{
      console.log(res);
        this._service.GetAllLevels().subscribe({
      next:(res)=>{
        console.log(res);
        this.Levels = res;
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


  this.newLevel.name="";
  this.newLevel.academicYear="";
  this.newLevel.levelNumber=0;
  this.newLevel.numberOfStudents=0
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

createLevel(){

     let levelData = new FormData();
  levelData.append('name', this.newLevel.name);
  levelData.append('academicYear', this.newLevel.academicYear);
  levelData.append('levelNumber', this.newLevel.levelNumber.toString());
  levelData.append('numberOfStudents', this.newLevel.numberOfStudents.toString());
  if(this.img != null){
    levelData.append('picUrl', this.img);
  }

  levelData.append("picUrl" , this.imgurl!);
  console.log(levelData);

this._service.AddLevel(levelData).subscribe({
  next:(res)=>{
    console.log(res);
    this.Levels.push(res);
    this.showAddCourseModal = false;
  },
  error:(err)=>{
    console.log(err);
  }
});

this.showAddCourseModal = false;

 this.newLevel.name="";
  this.newLevel.academicYear="";
  this.newLevel.levelNumber=0;
  this.newLevel.numberOfStudents=0
}

}
