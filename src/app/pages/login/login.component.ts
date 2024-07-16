import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from 'src/app/api/user.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup;
  public hide = true;
  constructor(
    public fb: UntypedFormBuilder, 
    public router: Router, 
    public userService: UserService,
    public appService: AppService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  public onLoginFormSubmit(values:Object):void {
    
    if (this.loginForm.valid) {
      this.userService.login(values)
        .subscribe(({ response }) => {
          this.userService.setAuthToken(response.token);
          this.router.navigate(['/']);
        }, 
        (e) => this.appService.openAlertDialog(e.status === 401 ? 'Error de credenciales' : 'Ha ocurrido un error'));      
    }
  }
}
