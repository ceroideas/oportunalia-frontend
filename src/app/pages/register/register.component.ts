import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { AppService } from 'src/app/app.service';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: UntypedFormGroup;
  public hide = true;
  public pressTypes = [
    { id: 1, name: 'Administrador concursal' },
    { id: 2, name: 'Prensa' },
    { id: 3, name: 'Agente inmobiliario' },
    { id: 4, name: 'Recomendación de un amigo' },
    { id: 5, name: 'RR.SS' },
    { id: 6, name: 'A través de una acción comercial' },
    { id: 7, name: 'Otros' }
  ];

  maxDate;

  constructor(public fb: UntypedFormBuilder, public router:Router, public snackBar: MatSnackBar, public appService:AppService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      /* pressTypes: ['', Validators.required], */
      confirmPassword: ['', Validators.required],
      receiveNewsletter: false,
      acceptConditions: false
    },{validator: matchingPasswords('password', 'confirmPassword')});

    this.maxDate = this.checkDate();
    /* console.log("Date minima");
    console.log(this.dateMinima); */
  }

  public checkDate(){
    let maxDate: Date = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    console.log("MaxDate");
    console.log(maxDate);
    return maxDate;
  }
  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      console.log(values);
      //this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      const message = 'register';
      let dialogRef = this.appService.showInfoMessage(message);
    }


  }


  registerUser(){
    console.log("Clic register user");
  }



}
