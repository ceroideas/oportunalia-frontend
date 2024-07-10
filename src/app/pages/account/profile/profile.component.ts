import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: Date;
  contrasena: string;

  public infoForm:UntypedFormGroup;
  public passwordForm:UntypedFormGroup;
  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar,public router:Router) { }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastname: ['', Validators.required],
      cif: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      image1: null,
      image2: null,
      address: null,
      province: null,
      city: null,
      postalcode: null,
      country: null,
      //website: null
    });
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      console.log(values)
      this.snackBar.open('Tu información se ha almacenado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  submitForm() {
    // Aquí puedes enviar los datos al backend o realizar otras acciones
    console.log('Formulario enviado:', this.nombre, this.apellido, this.email, this.fechaNacimiento, this.contrasena);
  }

  goToChangePassword(){
    this.router.navigate(['/account/profile/change-password'])
  }

}
