import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-control-pannel',
  imports: [RouterOutlet , NgClass , RouterLink ],
  templateUrl: './control-pannel.html',
  styleUrl: './control-pannel.css'
})
export class ControlPannel {
sidebarOpen:boolean = false;
}
