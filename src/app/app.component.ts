import { Component } from '@angular/core';
import { Settings, AppSettings } from './app.settings';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DomHandlerService } from './dom-handler.service';
import { UserService } from './api/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public settings: Settings;
  constructor(public appSettings:AppSettings,
              public router: Router,
              public userService: UserService,
              public translate: TranslateService,
              private domHandlerService: DomHandlerService){
    this.settings = this.appSettings.settings;
    translate.addLangs(['es','en','de','fr','ru','tr']);
    translate.setDefaultLang('es');
    translate.use('es');
    this.checkIfUserAuthenticated();
  } 

  checkIfUserAuthenticated() {    
    const token = this.userService.getToken();    
    if (token) {

      this.userService.setAuthToken(token);
    }
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.domHandlerService.winScroll(0, 0);
      }
    });
  }

}
