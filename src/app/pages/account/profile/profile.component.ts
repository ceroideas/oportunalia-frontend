import { Component, OnInit,Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import moment from 'moment';
import { GlobalConstants } from '../../../global-constants';
import { PublicService } from 'src/app/api/public.service';
import { AppService } from 'src/app/app.service';
import { SnackbarComponent } from '../../../custom/snackbar/snackbar.component';
import {
  MAT_DATE_FORMATS,
} from "@angular/material/core";
import { FormControl } from "@angular/forms";

export class MyFormat {
  value = 2;
  constructor() {}
  get display() {
    return this.value == 1
      ? {
          dateInput: "YYYY/MM/DD",
          monthYearLabel: "MMM YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "MMMM YYYY"
        }
      : {
          dateInput: "DD/MM/YYYY",
          monthYearLabel: "MM YYYY",
          dateA11yLabel: "DD/MM/YYYY",
          monthYearA11yLabel: "MM YYYY"
        };
  }
  get parse() {
    return this.value == 1
      ? {
          dateInput: "YYYY/MM/DD"
        }
      : {
          dateInput: "DD/MM/YYYY"
        };
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useClass: MyFormat }
  ]
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

  previewUrl: string | ArrayBuffer | null = null;
  previewUrl2: string | ArrayBuffer | null = null;

  public infoForm:UntypedFormGroup;
  public passwordForm:UntypedFormGroup;
  constructor(
    @Inject(MAT_DATE_FORMATS) private config: MyFormat,
    public appService: AppService,
    public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService,
    public publicService: PublicService
  ) { }

  formatDate(event: any) {
    const input = event.target.value;

    console.log(input);

    this.infoForm.patchValue({
      birthdate: input
    });
  }

  ngOnInit() {

    this.appService.getFavorites();

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
        province_id: this.userData.province_id ? this.userData.province_id.toString() : null,
        city: this.userData.city,
        cp: this.userData.cp,
        country_id: this.userData.country_id ? this.userData.country_id.toString() : null,
        birthdate: this.userData.birthdate,
      });

      (document.getElementById('birthdate') as HTMLInputElement).value = this.userData.birthdate;

      this.getProvinceList(this.userData.country_id);

      this.previewUrl = this.userData.document ? this.userData.document.path : null;
      this.previewUrl2 = this.userData.document_two ? this.userData.document_two.path : null;
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

  onFileChange(event: Event): void { 
    const input = event.target as HTMLInputElement;

    console.log(input.files);

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader);
        this.previewUrl = reader.result;
        console.log(this.previewUrl);
        this.uploadFile(file);
      };
      reader.readAsDataURL(file);
    }
  }
  onFileChange2(event: Event): void { 
    const input = event.target as HTMLInputElement;

    console.log(input.files);

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader);
        this.previewUrl2 = reader.result;
        this.uploadFile2(file);
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('document', file);

    this.publicService.upload_dni(formData).subscribe(
      (response) => {
        console.log('File uploaded successfully', response);
      },
      (error) => {
        console.error('Error uploading file', error);
      }
    );
  }

  uploadFile2(file: File): void {
    const formData = new FormData();
    formData.append('document', file);

    this.publicService.upload_dni_two(formData).subscribe(
      (response) => {
        console.log('File uploaded successfully', response);
      },
      (error) => {
        console.error('Error uploading file', error);
      }
    );
  }

  getBackgroundImage(): string { return this.previewUrl ? `url(${this.previewUrl})` : '';}
  getBackgroundImage2(): string { return this.previewUrl2 ? `url(${this.previewUrl2})` : '';}

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
      // this.snackBar.open('Tu información se ha almacenado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['success'],
        data: { message: 'Tu información se ha almacenado correctamente!' }
      });
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      // this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['success'],
        data: { message: 'Your password changed successfully!' }
      });
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
