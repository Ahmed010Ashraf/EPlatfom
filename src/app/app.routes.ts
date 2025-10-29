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

export const routes: Routes = [
    {path:"", redirectTo:"Home",pathMatch:"full"},
    {path:"Home" , component:Home , canActivate:[authGardGuard]},
    {path:"Login" , component:Login },
    {path:"Register" , component:Register },
    {path:"Courses" , component:Courses , canActivate:[authGardGuard] },
    {path:"Exams" , component:Exams , canActivate:[authGardGuard] },
    {path:"ExamDetails/:id" , component:ExamDetails , canActivate:[authGardGuard]},
    {path:"Courses/:id" , component:CourseDetails , canActivate:[authGardGuard]},
    {path:"**" , component:NotFound}
];
