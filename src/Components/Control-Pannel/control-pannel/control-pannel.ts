import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { Auth } from '../../../app/Services/auth';

@Component({
  selector: 'app-control-pannel',
  imports: [RouterOutlet , NgClass , RouterLink ],
  templateUrl: './control-pannel.html',
  styleUrl: './control-pannel.css'
})
export class ControlPannel implements OnInit {

  constructor(private _auth:Auth , private _router:Router){}

ngOnInit(): void {
   if(this._auth.userData.getValue()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]=="Student"){
    this._router.navigate(["Home"])
  }
}


sidebarOpen:boolean = false;
}
