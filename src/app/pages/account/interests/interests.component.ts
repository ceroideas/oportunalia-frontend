import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PublicService } from 'src/app/api/public.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent implements OnInit{

  public interestForm:UntypedFormGroup;
  provinceList: any;
  formatLabel(value: number): string {
    /* if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    } */

    return `${value}`;
  }

  constructor(public fb: UntypedFormBuilder, public snackBar: MatSnackBar,private publicService: PublicService){}

  ngOnInit() {
    this.getProvinceList();
    this.interestForm = this.fb.group({

    });

  }


  public onInterestFormSubmit(values:Object):void {
    if (this.interestForm.valid) {
      console.log(values)
      this.snackBar.open('Tu información se ha almacenado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

    }
  }

  getProvinceList(){
    this.publicService.provinceList(1)
      .subscribe(
        (response) => {
          this.provinceList = response.response;
        },
        (error) => {

        }
      )
  }

  updateInterest(){
    console.log("Update interest");

  }
}
