import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { AppService } from 'src/app/app.service';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { UserService } from 'src/app/api/user.service';
import moment from 'moment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //public registerForm: UntypedFormGroup;
  public registerForm = new FormGroup({
                    firstname: new FormControl(''),
                    lastname: new FormControl(''),
                    phone: new FormControl(0),
                    email: new FormControl(''),
                    password: new FormControl(''),
                    password_confirmation: new FormControl(''),
                    username: new FormControl(''),
                    document_number: new FormControl(''),
                    address: new FormControl(''),
                    city: new FormControl(''),
                    cp: new FormControl(''),
                    birthdate: new FormControl(new Date()),
                      });
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

  constructor(public fb: UntypedFormBuilder, public router:Router, public snackBar: MatSnackBar, public appService:AppService,public userService: UserService ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      password: ['', Validators.required],

      /* pressTypes: ['', Validators.required], */
      password_confirmation: ['', Validators.required],
      username: ['', Validators.required],
      //document_number: ['', Validators.required],
      //address: ['', Validators.required],
      //city: ['', Validators.required],
      //cp: ['', Validators.required],
      birthdate: ['', Validators.required],
      receiveNewsletter: false,
      acceptConditions: [false, Validators.required]
    },{validator: matchingPasswords('password', 'password_confirmation')});

    this.maxDate = this.checkDate();
    /* console.log("Date minima");
    console.log(this.dateMinima); */
  }

  public checkDate(){
    let maxDate: Date = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    /* console.log("MaxDate");
    console.log(maxDate); */
    return maxDate;
  }
  public onRegisterFormSubmit(user:Object):void {

    user['birthdate'] = moment(user['birthdate']).format('YYYY-MM-DD');

    //console.log(user);

    if (!user['acceptConditions']) {

      this.snackBar.open('Debes aceptar las condiciones para proceder', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      return;
    }

    if (this.registerForm.valid) {
      //this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.userService.userRegister(user)
      .subscribe(
        (response) => {
          /* console.log(response);
          console.log("Usuario registrado"); */
          const message = 'register';
          let dialogRef = this.appService.showInfoMessage(message);
          //this.router.navigate(['/registro-completo']);

        },
        (error)=>{
          /* console.log("Usuario no registrado");
          console.log(error); */
          const message = 'error_register_user';
          let dialogRef = this.appService.showInfoMessage(message);
          //console.log("Error en el registro de usuario");
        }
      )
    }


  }


  registerUser(){
    //console.log("Clic register user");
    const user = {
                //username: 'username123',
                firstname: this.registerForm.get('name').value,
                lastname: this.registerForm.get('lastname').value,
                phone: this.registerForm.get('phone').value,
                email: this.registerForm.get('email').value,
                password: this.registerForm.get('password').value,
                password_confirmation: this.registerForm.get('password_confirmation').value
              }
    console.log(user);

    if (this.registerForm.valid) {
      console.log("Form valid");
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }else{
      this.snackBar.open('Form invalid', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }


    /* this.userService.userRegister(user)
      .subscribe(
        (response) => {},
        (error)=>{}
      ) */


  }



}
