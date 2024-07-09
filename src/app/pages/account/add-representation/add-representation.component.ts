import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PublicService } from 'src/app/api/public.service';

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

  constructor(public fb: UntypedFormBuilder, public snackBar: MatSnackBar, public router:Router, private publicService: PublicService) { }
  ngOnInit(): void {

    this.representationForm = this.fb.group({
      alias: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      cif: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      lastname: null,
      address: null,
      city: null,
      cp: null,
      province_id: null,
      country_id: null,

    });

    this.getProvinceList(1);
    this.selectedCountry = 1;
    this.getCountryList();

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

  public onRepresentationFormSubmit(values:Object):void {
    if (this.representationForm.valid) {
      console.log(values)
      this.snackBar.open('Tu información se ha almacenado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.router.navigate(['/account/representations'])

    }
  }

  representationChange(value) {
    if(value==0){
      this.individualSelected=true;
      return;
    }
    if(value==1){
      this.individualSelected=false;
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
