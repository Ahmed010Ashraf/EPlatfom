import { Component, OnInit } from '@angular/core';
import { Code, ControlPannaleService, GetCode } from '../../../app/Services/ControlPanaleService/control-pannale-service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-generate-code-component',
  imports: [FormsModule],
  templateUrl: './generate-code-component.html',
  styleUrl: './generate-code-component.css'
})
export class GenerateCodeComponent implements OnInit {
  SendCodesData : Code = {
    courseId: 0,
  lessonId: 0,
  durationInDays: 0,
  numberOfCodes :  0
  };

  loader:boolean = false;


  GeneratedCodes : GetCode[]=[];

  courses:any;
  lects:any;


  constructor(private _service : ControlPannaleService){}

ngOnInit(): void {
  this._service.getAllCourses().subscribe({
    next:(res)=>{
      console.log(res);
      this.courses = res;
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })



   this._service.getAllLessons().subscribe({
    next:(res)=>{
      console.log(res);
      this.lects = res;
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}



Generate(){
  this.loader = true;
  this._service.generateCodes(this.SendCodesData).subscribe({
    next:(res)=>{
      console.log(res);
      this.GeneratedCodes = res;
      this.downloadCodesAsExcel(res);
    }
    ,
    error:(err)=>{
      console.log(err);
      
    }
  })
  this.loader = false;
}




downloadCodesAsExcel(codeList: any[]) {
    // Step 1: Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(codeList);

    // Step 2: Create workbook
    const workbook = {
      Sheets: { 'Codes': worksheet },
      SheetNames: ['Codes']
    };

    // Step 3: Generate Excel buffer
    const excelBuffer: any = XLSX.write(workbook, { 
      bookType: 'xlsx', 
      type: 'array' 
    });

    // Step 4: Save the file
    const blob = new Blob([excelBuffer], { type: 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, `codes_${new Date().getTime()}.xlsx`);
  }
}
