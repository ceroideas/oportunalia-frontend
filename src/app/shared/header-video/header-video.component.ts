import { Component, Input, OnInit } from '@angular/core';
import { AppSettings, Settings } from 'src/app/app.settings';
import { DomHandlerService } from 'src/app/dom-handler.service';

@Component({
  selector: 'app-header-video',
  templateUrl: './header-video.component.html',
  styleUrls: ['./header-video.component.scss']
})
export class HeaderVideoComponent implements OnInit {
  @Input('backgroundVideo') backgroundVideo; 
  @Input('contentOffsetToTop') contentOffsetToTop;
  @Input('contentMinHeight') contentMinHeight;
  @Input('title') title;
  @Input('desc') desc;
  @Input('isHomePage') isHomePage:boolean = false;
  @Input('fullscreen') fullscreen: boolean = false;
  public settings: Settings;
  constructor(public appSettings: AppSettings, private domHandlerService: DomHandlerService) { 
    this.settings = this.appSettings.settings;
    setTimeout(() => {
      this.settings.headerBgVideo = true;
    }); 
  }

  ngOnInit(): void {
    if(this.contentOffsetToTop){
      setTimeout(() => {
        this.settings.contentOffsetToTop = this.contentOffsetToTop;
      });
    } 
    var vid = <HTMLVideoElement> this.domHandlerService.winDocument.getElementById("bgVideo");
    vid.muted = true;
  }

  ngOnDestroy(){  
    setTimeout(() => {
      this.settings.headerBgVideo = false; 
      this.settings.contentOffsetToTop = false;
    });  
  }

}
