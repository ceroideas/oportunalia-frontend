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

  userData: any = {};

  constructor(
    public appService: AppService,
    public userService: UserService,
    private router: Router) { }

  ngOnInit() {

    this.userService.getUserData().subscribe(({ response }) => {
      this.userData = response;

      });

      console.log("OnInit");
      console.log(this.userData);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
