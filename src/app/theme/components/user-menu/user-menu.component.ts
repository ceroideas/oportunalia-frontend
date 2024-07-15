import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(
    public appService: AppService, 
    public userService: UserService,
    private router: Router) { }

  ngOnInit() {    
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
