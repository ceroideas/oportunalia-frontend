import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PublicService } from 'src/app/api/public.service';
import { UserService } from 'src/app/api/user.service';

/* TABS:  import { MatTabChangeEvent } from '@angular/material/tabs'; */

@Component({
  selector: 'app-add-representation',
  templateUrl: './add-representation.component.html',
  styleUrl: './add-representation.component.scss'
})
export class AddRepresentationComponent implements OnInit{

  public representationForm:UntypedFormGroup;
  individualSelected = true;
  selected = '0';
  countryList: any;
  provinceList: any;
  selectedCountry:any;
  selectedImage: File; 
  representations: any[];

  constructor(public fb: FormBuilder, public snackBar: MatSnackBar, public router:Router, 
    private publicService: PublicService, public userService: UserService
  ) { }

  ngOnInit(): void {

    this.publicService.getRepresentations().subscribe(({response}) => {

      this.representations = response;

    });

    this.representationForm = this.fb.group({
      alias: ['', [Validators.required, Validators.minLength(4)]],
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      document_number: ['', [Validators.required]], 
      file: [null, [Validators.required]], 
      address: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
      province_id: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      cp: ['', [Validators.required, Validators.minLength(3)]],
      representation_type_id: ['', [Validators.required]],
    });    

    this.getProvinceList(1);
    this.selectedCountry = 1;
    this.getCountryList();

  }

  onFileSelected(event: any) {    
    this.selectedImage = event.target.files[0];
  }

/*  Funciones ejemplo tabs
 myTabFocusChange(changeEvent: MatTabChangeEvent) {
    console.log('Tab position: ' + changeEvent.tab.position);
  }
  myTabSelectedIndexChange(index: number) {
     console.log('Selected index: ' + index);
  }
  myTabSelectedTabChange(changeEvent: MatTabChangeEvent) {
    console.log('Index: ' + changeEvent.index);
  }
  myTabAnimationDone() {
    console.log('Animation done.');
  } */

  public onRepresentationFormSubmit(values: any): void {    

    /* if (this.representationForm.valid) {
      
      const formData = this.representationForm.getRawValue();

      this.userService.saveRepresentation(formData).subscribe((_) => {
        this.snackBar.open('Tu información se ha almacenado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/account/representations']);
      });

      this.snackBar.open('Ha ocurrido un error!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    } */    
    if (this.representationForm.valid) {      

      let formInfo = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key) && key !== 'file') {
          formInfo.append(key, values[key]);
        }
      }

      formInfo.append('file', this.selectedImage, this.selectedImage.name);

      this.userService.saveRepresentation(formInfo).subscribe((_) => {
        this.snackBar.open('Tu información se ha almacenado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/account/representations']);
      }, (_) => this.snackBar.open('Ha ocurrido un error!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 }));

    }
      
  }

  representationChange(value) {
    if(value == 1){
      this.individualSelected = true;
      return;
    }
    if(value == 2){
      this.individualSelected = false;
      return;
    }
  }

  saveRepresentation(){
    console.log("saveRepresentation");
  }

  backRepresentations(){
    this.router.navigate(['/account/representations'])
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
