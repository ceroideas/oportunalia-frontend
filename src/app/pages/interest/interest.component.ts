import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { PublicService } from 'src/app/api/public.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss'

})
export class InterestComponent implements OnInit{
  @Input() variant:number = 1;
  public interestForm: UntypedFormGroup;
  public provinces: any[] = [];

  areaList: string[] = ['Toda España', 'Madrid', 'Barcelona', 'Valencia', 'Otros'];
  inversionList: string[] = ['Inversión', 'Residencia propia'];

  ubicacion = new FormControl([]);
  inversiones = new FormControl('');
  presupuesto = new FormControl('');
  presupuesto1 = new FormControl('30000');
  properties = new FormControl('');

  propertyList: string[] = ['Viviendas', 'Naves industriales','Garajes','Trasteros','Locales', 'Lotes inmobiliarios','Aplicaciones informáticas',
                            'Derechos de cobro y créditos','Maquinaria','Solares', 'Vehículos','Arte y antigüedades','Unidades productivas', 'Oficinas', 'Rústicos'];
  formatLabel(value: number): string {
    /* if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    } */
    return `${value}`;
  }
  constructor(public publicService:PublicService,public router:Router, public fb: UntypedFormBuilder, public appService:AppService,) { }

  ngOnInit() {
    this.interestForm = this.fb.group({
      name: ''
    });

    /*this.appService.getProvinces().subscribe((data: any) => { this.provinces = data });*/
    this.getProvinceList();

  }

  getProvinceList(){
    this.publicService.provinceList(1)
      .subscribe(
        (response) => {
          this.provinces = response.response;
        },
        (error) => {

        }
      )
  }


  public onInterestFormSubmit(values:Object):void {
    if (this.interestForm.valid) {

      this.appService.saveInterests({
        ubicacion:this.ubicacion.value.map(num=>num.toString()),
        inversion:this.inversiones.value.toString(),
        presupuesto:this.presupuesto.value,
        presupuesto1:this.presupuesto.value,
        activos:this.properties.value
      }).subscribe(data=>{
        console.log('guardado');
        this.router.navigate(['/account/profile']);
      })
    }
  }

  changePresupuesto()
  {
    console.log(this.presupuesto1.value);
    this.presupuesto.patchValue(this.presupuesto1.value)
  }

  presupuestoChange()
  {
    console.log(this.presupuesto.value);
    this.presupuesto1.patchValue(this.presupuesto.value)
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
