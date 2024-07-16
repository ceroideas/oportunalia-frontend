import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';

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
  userData: any = {};

  public infoForm:UntypedFormGroup;
  public passwordForm:UntypedFormGroup;
  constructor(
    public formBuilder: UntypedFormBuilder, 
    public snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService
  ) { }  

  ngOnInit() {

    this.userService.getUserData().subscribe(({ response }) => {      
      this.userData = response;
      this.infoForm.patchValue({
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        cif: this.userData.document_number,
        email: this.userData.email,
        phone: this.userData.phone,
        address: this.userData.address,
        province: this.userData.province_id,
        city: this.userData.city,
        postalcode: this.userData.cp,
        country: this.userData.country,
        birthdate: this.userData.birthdate,
      });
    });

    this.infoForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastname: ['', Validators.required],
      cif: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: [this.userData.phone, Validators.required],
      image1: null,
      image2: null,
      address: '',
      province: null,
      city: '',
      postalcode: null,
      country: '',   
      birthdate: null,
    });
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onInfoFormSubmit(values:Object):void {

    if (this.infoForm.valid) {      

      this.userService.updateUserData(values).subscribe((data) => console.log(data));
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
