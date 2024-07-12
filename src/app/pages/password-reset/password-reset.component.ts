import { Component,OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { UserService } from 'src/app/api/user.service';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent implements OnInit{

  public resetForm: UntypedFormGroup;
  email_reestablecer = "";


  constructor(public fb: UntypedFormBuilder, public router:Router,public userService: UserService, public appService:AppService) { }

  ngOnInit():void {
    this.resetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])]
    });



  }

  public onResetFormSubmit(values:Object):void {
    if (this.resetForm.valid) {
      /* this.router.navigate(['/']); */

      const user = {email: this.email_reestablecer};
      this.userService.userReestablecer(user)
        .subscribe(
          (response) => {
            const message = 'reset_pass';
            let dialogRef = this.appService.showInfoMessage(message);
            //this.notificationService.successNotification("Correo enviado");
          },
          (error) => {
            const message = 'error_reset_pass';
            let dialogRef = this.appService.showInfoMessage(message);
            //this.notificationService.errorNotification("Ha ocurrido un error");
          }
        )



    }


  }

  backLogin(){
    this.router.navigate(['/login'])
  }

}
