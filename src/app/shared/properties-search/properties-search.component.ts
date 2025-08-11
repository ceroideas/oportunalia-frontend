import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AppService } from '../../app.service';
import { SearchProperties } from '../../pages/home/interfaces/search-properties';
import { PublicService } from 'src/app/api/public.service';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { UactionsService } from 'src/app/services/uactions.service';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-properties-search',
  templateUrl: './properties-search.component.html',
  styleUrls: ['./properties-search.component.scss']
})
export class PropertiesSearchComponent implements OnInit {
  @Input() variant:number = 1;
  @Input() vertical:boolean = false;
  @Input() searchOnBtnClick:boolean = true;
  @Input() removedSearchField:string;
  @Output() onSearchChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchClick: EventEmitter<any> = new EventEmitter<any>();
  public showMore: boolean = false;
  public form: UntypedFormGroup;
  public propertyTypes: any[] = [];
  public propertyStatuses: any[] = [];
  public cities: any[] = [];
  public neighborhoods: any[] = [];
  public streets: any[] = [];
  public features: any[] = [];

  values = [{ "value": "60000", "show": "60.000 €"},
  { "value": "80000", "show": "80.000 €"},
  { "value": "100000", "show": "100.000 €"},
  { "value": "120000", "show": "120.000 €"},
  { "value": "140000", "show": "140.000 €"},
  { "value": "150000", "show": "150.000 €"},
  { "value": "160000", "show": "160.000 €"},
  { "value": "180000", "show": "180.000 €"},
  { "value": "200000", "show": "200.000 €"},
  { "value": "220000", "show": "220.000 €"},
  { "value": "240000", "show": "240.000 €"},
  { "value": "260000", "show": "260.000 €"},
  { "value": "280000", "show": "280.000 €"},
  { "value": "300000", "show": "300.000 €"},
  { "value": "320000", "show": "320.000 €"},
  { "value": "340000", "show": "340.000 €"},
  { "value": "360000", "show": "360.000 €"},
  { "value": "380000", "show": "380.000 €"},
  { "value": "400000", "show": "400.000 €"},
  { "value": "450000", "show": "450.000 €"},
  { "value": "500000", "show": "500.000 €"},
  { "value": "550000", "show": "550.000 €"},
  { "value": "600000", "show": "600.000 €"},
  { "value": "650000", "show": "650.000 €"},
  { "value": "700000", "show": "700.000 €"},
  { "value": "750000", "show": "750.000 €"},
  { "value": "800000", "show": "800.000 €"},
  { "value": "850000", "show": "850.000 €"},
  { "value": "900000", "show": "900.000 €"},
  { "value": "950000", "show": "950.000 €"},
  { "value": "1000000", "show": "1 millón €"},
  { "value": "1100000", "show": "1,1 millones €"},
  { "value": "1200000", "show": "1,2 millones €"},
  { "value": "1300000", "show": "1,3 millones €"},
  { "value": "1400000", "show": "1,4 millones €"},
  { "value": "1500000", "show": "1,5 millones €"},
  { "value": "1600000", "show": "1,6 millones €"},
  { "value": "1700000", "show": "1,7 millones €"},
  { "value": "1800000", "show": "1,8 millones €"},
  { "value": "1900000", "show": "1,9 millones €"},
  { "value": "2000000", "show": "2 millones €"},
  { "value": "2100000", "show": "2,1 millones €"},
  { "value": "2200000", "show": "2,2 millones €"},
  { "value": "2300000", "show": "2,3 millones €"},
  { "value": "2400000", "show": "2,4 millones €"},
  { "value": "2500000", "show": "2,5 millones €"},
  { "value": "2600000", "show": "2,6 millones €"},
  { "value": "2700000", "show": "2,7 millones €"},
  { "value": "2800000", "show": "2,8 millones €"},
  { "value": "2900000", "show": "2,9 millones €"},
  { "value": "3000000", "show": "3 millones €"}];

  categoryList: any;

  public searchPropertiesValues: SearchProperties = {
    min: 0,
    max: 0,
    search: '',
    type: 0,
    category: 0
  }

  constructor(public appService:AppService, public fb: UntypedFormBuilder, public publicService: PublicService, public uActionsService: UactionsService) { }

  options: any[] = [];
  options1: any[] = [];
  selectedValue: string;
  selectedValue1 = new FormControl("");
  isEditable: boolean = false;
  edited:boolean = false;

  onSelectionChange(event: any) {
    this.isEditable = event.value === 'Personalizado'; // Cambia esta condición según tus necesidades
    if (this.isEditable) {
      this.selectedValue1.patchValue("");
    }else{
      this.form.patchValue({min:this.selectedValue});
    }
  }

  onBlur() {
    if (this.edited) {
      this.options.shift();
    }
    this.isEditable = false;
    this.options.unshift({value:this.selectedValue1.value, show: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseFloat(this.selectedValue1.value))});
    this.selectedValue = this.selectedValue1.value;

    this.form.patchValue({min:this.selectedValue1.value});

    this.edited = true;
  }

  selectedValue2: string;
  selectedValue3 = new FormControl("");
  isEditable1: boolean = false;
  edited1:boolean = false;

  onSelectionChange1(event: any) {
    this.isEditable1 = event.value === 'Personalizado'; // Cambia esta condición según tus necesidades
    if (this.isEditable1) {
      this.selectedValue3.patchValue("");
    }else{
      this.form.patchValue({max:this.selectedValue2});  
    }
  }

  onBlur1() {
    if (this.edited1) {
      this.options1.shift();
    }
    this.isEditable1 = false;
    this.options1.unshift({value:this.selectedValue3.value, show: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseFloat(this.selectedValue3.value))});
    this.selectedValue2 = this.selectedValue3.value;

    this.form.patchValue({max:this.selectedValue3.value});

    this.edited1 = true;
  }

  ngOnInit() {
    console.log("parameters",this.uActionsService.parameters);
    if(this.vertical){
      this.showMore = true;
    };
    this.appService.getPropertyTypes()
      .subscribe((propertyTypesData) => {
        this.propertyTypes = propertyTypesData.response;
    });
    this.propertyStatuses = this.appService.getPropertyStatuses();
    this.appService.getCities().subscribe((citiesData: any) => {
      this.cities = citiesData.response;
      /*this.form.patchValue({
        city: this.uActionsService.parameters.search,
      });*/
    });    
    this.neighborhoods = this.appService.getNeighborhoods();
    this.streets = this.appService.getStreets();
    this.features = this.appService.getFeatures();
    this.form = this.fb.group({
      min: null,
      max: null,
      propertyType: null,
      // propertyStatus: null,
      propertyCategory: null,
      price: this.fb.group({
        from: null,
        to: null
      }),
      city: null,
      zipCode: null,
      neighborhood: null,
      street: null,
      bedrooms: this.fb.group({
        from: null,
        to: null
      }),
      bathrooms: this.fb.group({
        from: null,
        to: null
      }),
      garages: this.fb.group({
        from: null,
        to: null
      }),
      area: this.fb.group({
        from: null,
        to: null
      }),
      yearBuilt: this.fb.group({
        from: null,
        to: null
      }),
      features: this.buildFeatures()
    });

    this.getCategoryList();

    this.onSearchChange.emit(this.form);

    for (let i = 0; i < this.values.length; i++)
    {
      this.options.push(this.values[i]);
      this.options1.push(this.values[i]);
    }
    this.options.push({value: 'custom', show: 'Personalizado'});
    this.options1.push({value: 'custom', show: 'Personalizado'});

  }

  public buildFeatures() {
    const arr = this.features.map(feature => {
      return this.fb.group({
        id: feature.id,
        name: feature.name,
        selected: feature.selected
      });
    })
    return this.fb.array(arr);
  }


  ngOnChanges(){
    if(this.removedSearchField){
      if(this.removedSearchField.indexOf(".") > -1){
        let arr = this.removedSearchField.split(".");
        this.form.controls[arr[0]]['controls'][arr[1]].reset();
      }
      else if(this.removedSearchField.indexOf(",") > -1){
        let arr = this.removedSearchField.split(",");
        this.form.controls[arr[0]]['controls'][arr[1]]['controls']['selected'].setValue(false);
      }
      else{
        this.form.controls[this.removedSearchField].reset();
      }
    }
  }

  public reset(){
    this.form.reset({
      min: null,
      max: null,
      propertyType: null,
      // propertyStatus: null,
      propertyCategory: null,
      price: {
        from: null,
        to: null
      },
      city: null,
      zipCode: null,
      neighborhood: null,
      street: null,
      bedrooms: {
        from: null,
        to: null
      },
      bathrooms: {
        from: null,
        to: null
      },
      garages: {
        from: null,
        to: null
      },
      area: {
        from: null,
        to: null
      },
      yearBuilt: {
        from: null,
        to: null
      },
      features: this.features
    });
  }

  public search(){
    this.onSearchClick.emit();
  }

  public onSelectCity(){
    this.form.controls['neighborhood'].setValue(null, {emitEvent: false});
    this.form.controls['street'].setValue(null, {emitEvent: false});
  }
  public onSelectNeighborhood(){
    this.form.controls['street'].setValue(null, {emitEvent: false});
  }

  public getAppearance(): MatFormFieldAppearance {
    return (this.variant != 3) ? 'outline' : 'fill';
  }
  public getFloatLabel(): FloatLabelType {
    return (this.variant == 1) ? 'always' : 'auto';
  }

  getCategoryList(){
    this.publicService.categoryList()
      .subscribe(
        (response) => {
          this.categoryList = response.response;
          /*this.form.patchValue({
            propertyCategory: this.uActionsService.parameters.category,
          });*/
        },
        (error) => {

        }
      )
  }

  setSearchProps(value: any, key: string) {
    console.log(value,key)
    this.searchPropertiesValues[key] = isNaN(parseInt(value)) ? value : parseInt(value);
  }


}
