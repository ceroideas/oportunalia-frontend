import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss'

})
export class InterestComponent implements OnInit{
  @Input() variant:number = 1;
  public interestForm: UntypedFormGroup;
  public provinces: any[] = [];
  areas = new FormControl('');
  areaList: string[] = ['Toda España', 'Madrid', 'Barcelona', 'Valencia', 'Otros'];
  inversiones = new FormControl('');
  inversionList: string[] = ['Inversión', 'Residencia propia'];

  properties = new FormControl('');
  propertyList: string[] = ['Viviendas', 'Naves industriales','Garajes','Trasteros','Locales', 'Lotes inmobiliarios','Aplicaciones informáticas',
                            'Derechos de cobro y créditos','Maquinaria','Solares', 'Vehículos','Arte y antigüedades','Unidades productivas', 'Oficinas', 'Rústicos'];
  formatLabel(value: number): string {
    /* if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    } */

    return `${value}`;
  }
  constructor(public router:Router, public fb: UntypedFormBuilder, public appService:AppService,) { }

  ngOnInit() {
    this.interestForm =  this.fb.group({
      name: ''});

      this.provinces = this.appService.getProvinces();

  }



  public onInterestFormSubmit(values:Object):void {
    if (this.interestForm.valid) {
      //console.log(values);
      this.router.navigate(['/account/profile']);
    }
  }


  registerInterest(){
    console.log("Clic save and continue Interest");
  }

  public getAppearance(): MatFormFieldAppearance {
    return (this.variant != 3) ? 'outline' : 'fill';
  }
  public getFloatLabel(): FloatLabelType {
    return (this.variant == 1) ? 'always' : 'auto';
  }

}


/*   import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss'
})
export class SelectMultipleExample {
  toppingsControl = new FormControl([]);
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  onToppingRemoved(topping: string) {
    const toppings = this.toppingsControl.value as string[];
    this.removeFirst(toppings, topping);
    this.toppingsControl.setValue(toppings); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
} */
