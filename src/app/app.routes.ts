import { Routes } from '@angular/router';
import { Home } from '../Components/home/home';
import { Login } from '../Components/login/login';
import { Register } from '../Components/register/register';
import { NotFound } from '../Components/not-found/not-found';
import { Courses } from '../Components/courses/courses';
import { CourseDetails } from '../Components/course-details/course-details';
import { Exams } from '../Components/exams/exams';
import { ExamDetails } from '../Components/exam-details/exam-details';
import { authGardGuard } from './Gards/auth-gard-guard';
import { ControlPannel } from '../Components/Control-Pannel/control-pannel/control-pannel';
import { Component } from '@angular/core';
import { ControllExamComponent } from '../Components/Control-Pannel/controll-exam-component/controll-exam-component';
import { ControlCourseComponent } from '../Components/Control-Pannel/control-course-component/control-course-component';
import { ControlLectComponent } from '../Components/Control-Pannel/control-lect-component/control-lect-component';
import { GenerateCodeComponent } from '../Components/Control-Pannel/generate-code-component/generate-code-component';
import { ControlStudents } from '../Components/Control-Pannel/control-students/control-students';
import { SpecificCourse } from '../Components/specific-course/specific-course';
import { LessonDetials } from '../Components/lesson-detials/lesson-detials';

export const routes: Routes = [
    {path:"", redirectTo:"Home",pathMatch:"full"},
    {path:"Home" , component:Home , canActivate:[authGardGuard]},
    {path:"Login" , component:Login },
    {path:"Register" , component:Register },
    {path:"Courses" , component:Courses , canActivate:[authGardGuard] },
    {path:"Lesson/:id" , component:LessonDetials , canActivate:[authGardGuard] },
    {path:"Level/:id" , component:SpecificCourse , canActivate:[authGardGuard] },
    {path:"Exams" , component:Exams , canActivate:[authGardGuard] },
    {path:"ControlPanel" , component:ControlPannel , canActivate:[authGardGuard] , children:[
        {path:"", redirectTo:"Students",pathMatch:"full"},
        {path:"CreateExam" , component:ControllExamComponent , canActivate:[authGardGuard]},
        {path:"CreateCourse" , component:ControlCourseComponent , canActivate:[authGardGuard]},
        {path:"CreateLect" , component:ControlLectComponent , canActivate:[authGardGuard]},
        {path:"GenerateCode" , component:GenerateCodeComponent , canActivate:[authGardGuard]},
        {path:"Students" , component:ControlStudents , canActivate:[authGardGuard]},
    ] },
    {path:"ExamDetails/:id" , component:ExamDetails , canActivate:[authGardGuard]},
    {path:"Courses/:id" , component:CourseDetails , canActivate:[authGardGuard]},
    {path:"**" , component:NotFound}
];
