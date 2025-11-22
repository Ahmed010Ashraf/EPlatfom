import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Environment } from '../../Environments/environment';
import { AllExamsResponse, SubmitExamRequest } from '../../../Components/exam-details/exam-details';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  

  constructor(private _http:HttpClient){

  }


  GetAllExams():Observable<any>{
    return this._http.get(`${Environment.BaseUrl}Exam`);
  }



  GetExamById(id:number):Observable<any>{


      const token = localStorage.getItem('Token'); // replace 'token' with your key

  // Set the headers
  const headers = token
    ? new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    : undefined;


    return this._http.get(`${Environment.BaseUrl}Exam/${id}`,{headers});
  }



  SendExam(data : SubmitExamRequest):Observable<any>{


    const token = localStorage.getItem('Token'); 

  const headers = token
    ? new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    : undefined;


return this._http.post(`${Environment.BaseUrl}Exam/SendStudentExam` , data,{headers})
  }

}
