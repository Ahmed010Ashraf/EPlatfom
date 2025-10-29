import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode} from 'jwt-decode'
import { HttpClient } from '@angular/common/http';
import {Environment} from '../Environments/environment'
import { RegisterData } from '../Interfaces/register-data';
import { LoginData } from '../Interfaces/login-data';
@Injectable({
  providedIn: 'root'
})
export class Auth {
  
constructor(private _http:HttpClient){

}
userData:BehaviorSubject<any> = new BehaviorSubject(null);
ChangeUserState(){
  const token = localStorage.getItem("Token");
  if (token) {
    this.userData.next(jwtDecode(token));
    console.log(this.userData.getValue());
  }
  
}


Register(data:RegisterData):Observable<any>{
return this._http.post(`${Environment.BaseUrl}Authontication/register` , data);
}



Login(data:LoginData):Observable<any>{
return this._http.post(`${Environment.BaseUrl}Authontication/login` , data);
}

}


