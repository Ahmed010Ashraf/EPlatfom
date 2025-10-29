import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '../../app/Services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  constructor(private _auth : Auth , private _router :Router){

  }

loginForm:FormGroup = new FormGroup({
    phoneNumber:new FormControl(null, [Validators.required,Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]),
  password:new FormControl(null,[Validators.required , Validators.minLength(6)])
});
ErrorMessage:string = '';
isload:boolean = false;
submitForm(){
  this.isload = true;
  console.log(this.loginForm.value);
  this._auth.Login(this.loginForm.value).subscribe({
    next:(res)=>{console.log(res);
      localStorage.setItem('Token',res.token);
      this._auth.ChangeUserState();
      this._router.navigate(['Home'])
      this.isload = false;
    },
    error:(err)=>{
      console.log(err)
      this.ErrorMessage=err.error.message;
      this.isload = false;
    }
    
  })
  
}
}
