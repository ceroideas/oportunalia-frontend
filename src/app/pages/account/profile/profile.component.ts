import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import moment from 'moment';
import { PublicService } from 'src/app/api/public.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  countryList: any;
  provinceList: any;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: Date;
  contrasena: string;
  userData: any = {};
  selectedCountry:any;
  selectedProvince:any;
  selected:any;

  public infoForm:UntypedFormGroup;
  public passwordForm:UntypedFormGroup;
  constructor(
    public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService,
    public publicService: PublicService
  ) { }

  ngOnInit() {

    this.getCountryList();
    this.userService.getUserData().subscribe(({ response }) => {
      this.userData = response;
      this.selectedCountry = response.country_id;
      this.selectedProvince = response.province_id;
      this.selected = 1;
      this.infoForm.patchValue({
        username: this.userData.username,
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        document_number: this.userData.document_number,
        email: this.userData.email,
        phone: this.userData.phone,
        address: this.userData.address,
        province_id: this.userData.province_id,
        city: this.userData.city,
        cp: this.userData.cp,
        country_id: this.userData.country_id,
        birthdate: this.userData.birthdate,
      });
    });

    this.infoForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastname: ['', Validators.required],
      document_number: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: [this.userData.phone, Validators.required],
      image1: null,
      image2: null,
      address: '',
      province_id: '',
      city: '',
      cp: null,
      country_id: '',
      birthdate: null,
    });
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  getCountryList(){
    this.publicService.countryList()
      .subscribe(
        (response) => {
          this.countryList = response.response;
        },
        (error) => {

        }
      )
  }

  public onInfoFormSubmit(values:Object):void {

    if (this.infoForm.valid) {
      values['birthdate'] = moment(values['birthdate']).format('YYYY-MM-DD');
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

  getProvinceList(value){
    this.publicService.provinceList(value)
      .subscribe(
        (response) => {
          this.provinceList = response.response;
        },
        (error) => {

        }
      )
  }

}
