import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {

    const token = this.userService.getToken();

    if (token) {

      this.userService.setAuthToken(token);
      return true;

    } else {

      this.router.navigate(['/login']); 
      return false; 
    }
  }
}
