import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ControlPannaleService } from '../../app/Services/ControlPanaleService/control-pannale-service';

@Component({
  selector: 'app-specific-course',
  imports: [RouterLink],
  templateUrl: './specific-course.html',
  styleUrl: './specific-course.css'
})
export class SpecificCourse implements OnInit {


  constructor(private _activatedRoute : ActivatedRoute , private _service : ControlPannaleService){}
  LevelId !: number;
  courses:any;
ngOnInit(): void {
   this._activatedRoute.paramMap.subscribe(param=>{
    this.LevelId = Number(param.get("id"));
    console.log(this.LevelId);



    
    this._service.GetCoursesByLevelId(this.LevelId).subscribe(res=>{
      this.courses = res;
    })
   })

   }
  
}
