import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  id:string = "3";

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
}
