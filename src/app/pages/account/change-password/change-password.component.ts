import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{

  public passwordForm:UntypedFormGroup;
  public hide = true;

constructor(
  public fb: UntypedFormBuilder, 
  public snackBar: MatSnackBar, 
  public router: Router, public userService: UserService) {

}

ngOnInit(): void {
  this.passwordForm = this.fb.group({
    password: ['', Validators.required],
    current_password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  },{validator: matchingPasswords('password', 'confirmPassword')});

}

backProfile(){
  this.router.navigate(['/account/profile'])
}

public onPasswordFormSubmit (values: Object): void {
    if (this.passwordForm.valid) {
      this.userService.updateUserPassword(values).subscribe(({ response }) => {
        console.log(response);
        this.snackBar.open('La contraseña se ha cambiado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/account/profile']);
      }, (e) => console.log(e));
    }
  }
}