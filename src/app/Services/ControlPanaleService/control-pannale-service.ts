import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../Environments/environment';





export interface User {
  id:          string;
  fullName:    string;
  email:       string;
  phoneNumber: string;
}








export interface AllCourses {
  id:           number;
  title:        string;
  description:  string;
  imageUrl?:     string;
  levelName:    string;
  levelFK:      number;
  lessonsCount: number;
}




export interface CourseByID {
  lessons:      Lesson[];
  id:           number;
  title:        string;
  description:  string;
  imageUrl:     string;
  levelName:    string;
  levelFK:      number;
  lessonsCount: number;
  ImgUrl:string|null;
}

export interface Lesson {
  id:            number;
  title:         string;
  description:   string;
  imageName:     string;
  docName:       string;
  courseName:    string;
  levelName:     string;
  announcements: any[];
  comments:      any[];
  videos:        any[];
}












export interface ExamOption {
  id?: number;
  text: string;
  isCorrect: boolean;
  questionId?: number;
}

export interface ExamQuestion {
  id?: number;
  title: string;
  picUrl?: File|null;
  examId?: number;
  options: ExamOption[];
}

export interface CreateExamDto {
  courseId: number|null;
  lessonId: number|null;
  duration: number;
  title: string;
  startTime: string; 
  questions: ExamQuestion[];
}





export interface GotLesson {
  id:            number,
  title:         string,
  description:   string,
  imageName:     string,
  docName:       string,
  courseName:    string,
  courseIdFK:number,
  levelName:     string,
  announcements: any[],
  comments:      any[],
  videos:        string[],
  img:string|null
}









export interface DataSendToAddLevel {
  levelNumber:  number;
  academicYear: string;
  name:         string;
}









export interface Code {
  courseId?:       number;
  lessonId?:       number;
  durationInDays: number;
  numberOfCodes:  number;
}






export interface GetCode {
  id:             string;
  durationInDays: number;
  courseId:       number;
  lessonId:       number;
  isUsed:         boolean;
}



@Injectable({
  providedIn: 'root'
})
export class ControlPannaleService {
  constructor(private _http:HttpClient) { }



//level services

  //add level
  addLevel(level:DataSendToAddLevel):Observable<any>
  {
    return this._http.post(`${Environment.BaseUrl}Courses/AddLevel`,level);
  }


//get all levels

  getAllLevels():Observable<any>
  {
    return this._http.get<any>(`${Environment.BaseUrl}Courses/GetAllLevels`);
  }


  //get courses by level id 
  GetCoursesByLevelId(id:any):Observable<any>{
    return this._http.get(`${Environment.BaseUrl}Courses/level/${id}`)
  }















// course services


//get
 getAllCourses():Observable<AllCourses[]>
{
  return this._http.get<AllCourses[]>(`${Environment.BaseUrl}Courses`);
}


getCourseById(id:number):Observable<CourseByID>
{
  return this._http.get<CourseByID>(`${Environment.BaseUrl}Courses/${id}`);
}

//add
  addCourse(course:FormData):Observable<any>
  {
    return this._http.post(`${Environment.BaseUrl}Courses`,course);
  }


  //update 
  updateCourse(id:number,course:FormData):Observable<any>
  {
    return this._http.put(`${Environment.BaseUrl}Courses/${id}`,course);
  }


//delete 
  deleteCourse(id:number):Observable<any>
  {
    return this._http.delete(`${Environment.BaseUrl}Courses/${id}`);
  }




  //////////////////////////end of course services /////////////////////////

  //lesson services

  //get

getAllLessons():Observable<GotLesson[]>
{
  return this._http.get<GotLesson[]>(`${Environment.BaseUrl}Lessons`);
}




  getLessonById(id:number):Observable<GotLesson>
{
  return this._http.get<GotLesson>(`${Environment.BaseUrl}Lessons/${id}`);
}


GetLessonsByCourseId(id:any):Observable<any>{
  return this._http.get(`${Environment.BaseUrl}Lessons/course/${id}`)
}




//add 

  addLesson(lesson:FormData):Observable<any>
  {
    return this._http.post(`${Environment.BaseUrl}Lessons/Lesson`,lesson);
  }



//update
  updateLesson(id:number,lesson:FormData):Observable<any>
  {
    return this._http.put(`${Environment.BaseUrl}Lessons/UpdateLesson/${id}`,lesson);
  }

  //delete 
  deleteLesson(id:number):Observable<any>
  {
    return this._http.delete(`${Environment.BaseUrl}Lessons/${id}`);
  }


  //////////////////////////end of lesson services /////////////////////////

  //code services
  generateCodes(code:Code):Observable<GetCode[]>
  {
    return this._http.post<GetCode[]>(`${Environment.BaseUrl}Enrollment/GenerateCodes`,code);
  }


  //check enrollment service 

  CheckEnrollment(courseid:any ,TargetType:string = "course" ):Observable<any>{


      const token = localStorage.getItem('Token'); // replace 'token' with your key

  // Set the headers
  const headers = token
    ? new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    : undefined;


    return this._http.get(`${Environment.BaseUrl}Enrollment/check?TargetId=${courseid}&TargetType=${TargetType}`,{headers})
  }





  AddUserToCourse(courseid:any , codeid:any):Observable<any>{

    let obj = {
  codeId:codeid ,
  courseId: courseid,
    }


    
      const token = localStorage.getItem('Token');
      // Set the headers
  const headers = token
    ? new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    : undefined;


    return this._http.post(`${Environment.BaseUrl}Enrollment/enroll`,obj,{headers})
  }



  ////////////////////////////end of code services /////////////////////////

  //exam services
  createExam(exam:CreateExamDto):Observable<any>
  {
    return this._http.post(`${Environment.BaseUrl}Exam/Create`,exam);
  }


  deleteExam(id:number):Observable<any>
  {
    return this._http.delete(`${Environment.BaseUrl}Exams/${id}`);
  }
  

  ///////////////////////////end of exam services /////////////////////////

  //student service 
  getAllStudents():Observable<User[]>
  {
    return this._http.get<User[]>(`${Environment.BaseUrl}User/all`);
  }


  deleteStudent(id:string):Observable<any>
  {
    return this._http.delete(`${Environment.BaseUrl}User/${id}`);
  }



}
