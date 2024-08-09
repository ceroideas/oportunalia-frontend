import { Component } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  isLoaded: boolean = false;
  success: boolean = false;
  resetForm: any;
  password: any;
  token: string = '';

  constructor(public fb: UntypedFormBuilder, public router: Router, 
    public userService: UserService, public appService: AppService, public route: ActivatedRoute) {
      
      this.token = this.route.snapshot.paramMap.get('token');

    }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.compose([Validators.required])]
    });
  }

  public onResetFormSubmit (values: Object): void {    

    if (this.resetForm.valid) {      
      
      this.userService.changePassword(this.password, this.token)
        .subscribe(
          (_) => {            
            this.appService.showInfoMessage('Cambio de clave exitoso');            
          },
          (error) => {
            const message = 'error_reset_pass';
            this.appService.showInfoMessage(message);
            //this.notificationService.errorNotification("Ha ocurrido un error");
          }
        )
    }
  }

  backLogin(){
    this.router.navigate(['/login'])
  }
}
