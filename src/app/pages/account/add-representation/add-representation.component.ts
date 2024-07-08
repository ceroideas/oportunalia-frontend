import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-representation',
  templateUrl: './add-representation.component.html',
  styleUrl: './add-representation.component.scss'
})
export class AddRepresentationComponent implements OnInit{

  public representationForm:UntypedFormGroup;
  selected = '0';
  constructor(public fb: UntypedFormBuilder, public snackBar: MatSnackBar, public router:Router) { }
  ngOnInit(): void {

    this.representationForm = this.fb.group({

    });
    console.log("OnInit add representation");
    console.log(this.selected);

  }

  public onRepresentationFormSubmit(values:Object):void {
    if (this.representationForm.valid) {
      console.log(values)
      this.snackBar.open('Tu información se ha almacenado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.router.navigate(['/account/representations'])

    }
  }

  saveRepresentation(){
    console.log("saveRepresentation");
  }

}
