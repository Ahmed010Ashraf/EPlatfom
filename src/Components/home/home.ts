import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../app/Services/auth';
import { ControlPannaleService } from '../../app/Services/ControlPanaleService/control-pannale-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  // id:string = "3";

  constructor(private _auth : Auth , private _router : Router , private _service:ControlPannaleService){

  }

  levels : any;
  
isUserLogin : boolean = false;
isAdmin = false;

ngOnInit(): void {
  console.log("this is user data" , this._auth.userData.getValue()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
  if(this._auth.userData.getValue()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]!="Student"){
this.isAdmin = true;
  }
  if(this._auth.userData.getValue() != null){
    this.isUserLogin = true;
  }
  else {
    this.isUserLogin = false;
  }

  console.log(this.isUserLogin);



  this._service.GetAllLevels().subscribe(res=>{
    this.levels = res;
    console.log(res);
    
  })

  
}


  toggle(){
    
    var menu = document.getElementById("mobile-menu");
    if(menu?.classList.contains("hidden")){
      menu.classList.remove("hidden");
    }else{
      menu?.classList.add("hidden");
    }
  }


  scrollToSection(sectionId: string) {
    if(sectionId == 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}



LogOut(){
  localStorage.removeItem("Token");
  this._auth.userData.next(null);
  this._router.navigate(['Login'])
}



GoToLevelCourses(id:number){
  this._router.navigate(["Level",id])
}
}
