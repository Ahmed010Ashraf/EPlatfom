import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../app/Services/auth';
import { ControlPannaleService } from '../../app/Services/ControlPanaleService/control-pannale-service';

@Component({
  selector: 'app-register',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{
registerForm:FormGroup = new FormGroup({
userName:new FormControl(null,[Validators.required , Validators.minLength(3)]),
phoneNumber:new FormControl(null,[Validators.required,Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]),
parentPhonenumber:new FormControl(null,[Validators.required,Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]),
password:new FormControl (null , [Validators.required , Validators.minLength(6)]),
government: new FormControl(null , [Validators.required]),
levelNumber:new FormControl(null, Validators.required),
email:new FormControl(null, [Validators.required , Validators.email]),
fullName:new FormControl(null , [Validators.required, Validators.minLength(4)])
},this.comparePhones);

levels :any;

constructor(private _Auth:Auth , private _router :Router , private _service:ControlPannaleService) {
  
  
}


ngOnInit(): void {
  this._service.GetAllLevels().subscribe({
    next:(res)=>{
      console.log(res);
      this.levels = res;
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}


ErrorMessage:string = '';
isload :boolean = false
comparePhones(g:any){
if(g.get("phoneNumber")?.value != g.get("parentPhonenumber")?.value){
  return null
}
else {
  return {'samePhone':true}
}


}

submitForm(){
this.isload = true;
//   if(this.registerForm.value.levelNumber == "الصف الأول"){
//     this.registerForm.value.levelNumber = 1;
//   }
//   else if (this.registerForm.value.levelNumber == "الصف الثاني"){
//  this.registerForm.value.levelNumber = 2;
//   }

//   else {
//      this.registerForm.value.levelNumber = 3;
//   }


  console.log(this.registerForm.value);

  this._Auth.Register(this.registerForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      localStorage.setItem('Token',res.token);
      this._Auth.ChangeUserState();
      this.isload = false;
      this._router.navigate(['Home'])
    },
    error:(err)=>{console.log(err);
      this.isload = false;
      this.ErrorMessage = err.error.message;
    }
    
  })
}
}
