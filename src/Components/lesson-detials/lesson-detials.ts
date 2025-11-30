import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ControlPannaleService } from '../../app/Services/ControlPanaleService/control-pannale-service';
import { Environment } from '../../app/Environments/environment';

@Component({
  selector: 'app-lesson-detials',
  imports: [],
  templateUrl: './lesson-detials.html',
  styleUrl: './lesson-detials.css'
})
export class LessonDetials implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _service: ControlPannaleService,
    private sanitizer: DomSanitizer
  ) {}

  lessonid!: number;
  lesson: any;
  isUserAllowed: boolean = false;

  safeUrl!: SafeResourceUrl;    // The video URL for iframe

  ngOnInit(): void {
    this._route.paramMap.subscribe(param => {
      this.lessonid = Number(param.get('id'));
      console.log(this.lessonid);
      

      this._service.CheckEnrollment(this.lessonid , "lesson").subscribe(res => {
        this.isUserAllowed = res;
        console.log(this.isUserAllowed);
        

        if (this.isUserAllowed) {
          this.loadLesson();
        }
      });
    });
  }

  loadLesson() {
    this._service.getLessonById(this.lessonid).subscribe({
      next: (res) => {
        this.lesson = res;

        const video = this.lesson.videos[0]; // we know only 1 video exists
this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  `${video}?controls=1&modestbranding=1&rel=0&disablekb=1&enablejsapi=1&origin=http://localhost:4200&playsinline=1`
);



      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  disableRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  // -----------------------------
  // OPTIONAL: Custom Controls
  // -----------------------------

  playVideo() {
    const iframe = document.getElementById('lessonVideo') as HTMLIFrameElement;
    iframe.contentWindow?.postMessage(
      '{"event":"command","func":"playVideo","args":""}', '*'
    );
  }

  pauseVideo() {
    const iframe = document.getElementById('lessonVideo') as HTMLIFrameElement;
    iframe.contentWindow?.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}', '*'
    );
  }

changeSpeed(event: any) {
  const speed = Number(event.target.value);
  
  const message = JSON.stringify({
    event: "command",
    func: "setPlaybackRate",
    args: [speed]
  });

  const iframe = document.getElementById('lessonVideo') as HTMLIFrameElement;
  iframe.contentWindow?.postMessage(message, '*');
}


fullscreen() {
  const container = document.getElementById("videoContainer") as any;
  if (container.requestFullscreen) {
    container.requestFullscreen();
  }
}

}
