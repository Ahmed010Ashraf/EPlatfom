import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ControlPannaleService, User } from '../../../app/Services/ControlPanaleService/control-pannale-service';

@Component({
  selector: 'app-control-students',
  imports: [],
  templateUrl: './control-students.html',
  styleUrl: './control-students.css'
})
export class ControlStudents implements OnInit {


  constructor(private _service : ControlPannaleService , private cdr: ChangeDetectorRef){}


  Students : User[]=[];

    ngOnInit(): void {
      this._service.getAllStudents().subscribe({
        next:(res)=>{
          console.log(res);
          this.Students = res;
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }



    DeleteStudent(id:string){
      this._service.deleteStudent(id).subscribe({
        next:(res)=>{
          
          console.log(res);
           this.Students = this.Students.filter(student => student.id !== id);
        // this.cdr.detectChanges(); 
        

        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
}
