/* import { Component, OnInit, Input } from '@angular/core'; */
import { Component, OnInit, inject } from '@angular/core';
import { Settings, AppSettings } from '../../app.settings';
import { AppService } from '../../app.service';
import { Property, Pagination, Location } from '../../app.models';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
/* import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field'; */
import { PublicService } from 'src/app/api/public.service';
import { UactionsService } from 'src/app/services/uactions.service';
import { SearchProperties } from './interfaces/search-properties';
import { Router } from '@angular/router';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import { ModalOffersComponent } from '../modal-offers/modal-offers.component';

import { MarkerClustererOptions } from '@angular/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //@Input() variant:number = 1;
  watcher: Subscription;
  activeMediaQuery = '';
  provinceList: any;
  categoryList: any;

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

  markerClustererOptions: MarkerClustererOptions = {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    styles: [
    {
      textColor: 'white',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png', // URL de la imagen del cluster
      height: 53, // Altura de la imagen
      width: 53, // Ancho de la imagen
      textSize: 14, // Tamaño del texto dentro del cluster
      anchorText: [19, 0]
    },
    {
      textColor: 'white',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png', // URL de la imagen del cluster
      height: 56,
      width: 56,
      textSize: 14,
      anchorText: [19, 0]
    },
    {
      textColor: 'white',
      url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png', // URL de la imagen del cluster
      height: 66,
      width: 66,
      textSize: 14,
      anchorText: [19, 0]
    }]
  };
  // 40.4380986, -3.844343
  getLat()
  {var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth > 1920) {
      return 40.4380986;
    } else if (screenWidth == 1920) {
      return 40.4380986;
    } else {
      return 40.4380986;
    }
  }
  getLng()
  {var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth > 1920) {
      return -3.844343;
    } else if (screenWidth == 1920) {
      return -3.844343;
    } else {
      return -3.844343;
    }
  }

  getZoomLevel() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log(screenWidth);
    if (screenWidth > 2048) {
      console.log(7)
      return 7;
    } else if (screenWidth >= 1920) {
      return 6;
    } else {
      return 5;
    }
  }

  getGreedy() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log(screenWidth);
    if (screenWidth > 2048) {
      return null;
    } else if (screenWidth >= 1360) {
      return null;
    } else {
      return "greedy";
    }
  }

  markerClustererImagePath =
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  //center: google.maps.LatLngLiteral = { lat: 40.678178, lng: -73.944158};
  center: google.maps.LatLngLiteral = { lat: this.getLat(), lng: this.getLng() };
  zoom: number = this.getZoomLevel();
  markerOptions: google.maps.MarkerOptions = { draggable: false, icon: {url:'assets/marker.png', scaledSize: new google.maps.Size(60, 60)} };
  markerPositions: { lat: number, lng: number, title: string, route: string, category: number, province: string}[] = [];
  mapOptions: google.maps.MapOptions = {
    fullscreenControl: true,
    mapTypeControl: true,
    gestureHandling: this.getGreedy()
  }

  options: any[] = [];
  options1: any[] = [];
  selectedValue: string;
  selectedValue1 = new FormControl("");
  isEditable: boolean = false;
  edited:boolean = false;

  onSelectionChange(event: any) {
    this.isEditable = event.value === 'custom'; // Cambia esta condición según tus necesidades
    if (this.isEditable) {
      this.selectedValue1.patchValue("");
    }
  }

  onBlur() {
    if (this.edited) {
      this.options.shift();
    }
    this.isEditable = false;
    this.options.unshift({value:this.selectedValue1.value, show: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseFloat(this.selectedValue1.value))});
    this.selectedValue = this.selectedValue1.value;

    this.edited = true;
  }

  selectedValue2: string;
  selectedValue3 = new FormControl("");
  isEditable1: boolean = false;
  edited1:boolean = false;

  onSelectionChange1(event: any) {
    this.isEditable1 = event.value === 'custom'; // Cambia esta condición según tus necesidades
    if (this.isEditable1) {
      this.selectedValue3.patchValue("");
    }
  }

  onBlur1() {
    if (this.edited1) {
      this.options1.shift();
    }
    this.isEditable1 = false;
    this.options1.unshift({value:this.selectedValue3.value, show: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseFloat(this.selectedValue3.value))});
    this.selectedValue2 = this.selectedValue3.value;

    this.edited1 = true;
  }


  public searchPropertiesValues: SearchProperties = {
    min: null,
    max: null,
    search: null,
    type: 0,
    category: null
  }
  public slides: any[] = [];
  public properties: Property[];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public count: number = 8;
  public sort: string;
  public searchFields: any;
  public removedSearchField: string | null;
  public pagination:Pagination = new Pagination(1, 8, null, 2, 0, 0);
  public message: string | null;
  public featuredProperties: any[];
  public soonProperties: any[];
  public locations: Location[];

  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService, public mediaObserver: MediaObserver, 
    public uActionsService: UactionsService, private publicService: PublicService, public router: Router) {
    this.settings = this.appSettings.settings;

    this.watcher = mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {
      // console.log(change)
      if(change.mqAlias == 'xs') {
        this.viewCol = 100;
      }
      else if(change.mqAlias == 'sm'){
        this.viewCol = 50;
      }
      else if(change.mqAlias == 'md'){
        this.viewCol = 33.3;
      }
      else{
        this.viewCol = 25;
      }
    });

  }
  
  dialog = inject(MatDialog);

  openDialog() {
    if (!localStorage.getItem('popupofertas') && !localStorage.getItem('token')) {
      localStorage.setItem('popupofertas','1');
      /*this.dialog.open(ModalOffersComponent, {
        maxWidth: '95vw'
      });*/
    }
  }

  ngOnInit() {
    this.getSlides();
    // this.getLocations();
    this.getProperties();
    this.getFeaturedProperties();
    this.getSoonProperties();
    this.getProvinceList();
    this.getCategoryList();
    this.openDialog();

    for (let i = 0; i < this.values.length; i++)
    {
      this.options.push(this.values[i]);
      this.options1.push(this.values[i]);
    }
    this.options.push({value: 'custom', show: 'Personalizado'});
    this.options1.push({value: 'custom', show: 'Personalizado'});
  }

  ngDoCheck(){
    if(this.settings.loadMore.load){
      this.settings.loadMore.load = false;
      this.getProperties();
    }
  }

  ngOnDestroy(){
    this.resetLoadMore();
    this.watcher.unsubscribe();
  }

  public getSlides(){
    this.appService.getHomeCarouselSlides().subscribe(res=>{
      this.slides = res;
    })
  }

  public getLocations(){
    this.appService.getLocations().subscribe(res =>{
      this.locations = res;
    })
  }

  public getProperties(){
    //console.log('get properties by : ', this.searchFields);
    this.appService.getProperties().subscribe(info => {
      // const data = info?.response && info?.code === 200 ? info.response : [];

      for(let properties of info) {
        for(let i of properties.response)
        {
          if (!i.lat || !i.lng) {
            this.geocodeAddress(i.city+', '+i.address+', '+i.province+', España',i.title,'/propiedades/'+i.link_rewrite,i.active_id, i.active_category_id, i.province);
          }else{
            this.markerPositions.push({lat:parseFloat(i.lat),lng:parseFloat(i.lng),title:i.title,route:'/propiedades/'+i.link_rewrite,category:i.active_category_id, province:i.province});
          }
        }
      }

      /*if(this.properties && this.properties.length > 0){
        this.settings.loadMore.page++;
        this.pagination.page = this.settings.loadMore.page;
      }
      let result = this.filterData(data);
      if(result.data?.length == 0) {        
        this.properties = [];
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
        this.message = 'No hay resultados';
        return false;
      }
      if(this.properties && this.properties.length > 0){
        this.properties = this.properties.concat(result.data);
      }
      else{
        this.properties = result.data;
      }
      this.pagination = result.pagination;
      this.message = null;

      if(this.properties.length == this.pagination.total){
        this.settings.loadMore.complete = true;
        this.settings.loadMore.result = this.properties.length;
      }
      else{
        this.settings.loadMore.complete = false;
      }

      if(this.settings.header == 'map'){
        this.locations.length = 0;
        this.properties.forEach(p => {
          let loc = new Location(p.id, p.location.lat, p.location.lng);
          this.locations.push(loc);
        });
        this.locations = [...this.locations];
      }*/
      return true;
    })
  }

  public resetLoadMore(){
    this.settings.loadMore.complete = false;
    this.settings.loadMore.start = false;
    this.settings.loadMore.page = 1;
    this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
  }

  public filterData(data){
    return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
  }

  public searchClicked(){
    this.properties.length = 0;
    this.getProperties();
  }
  public searchChanged(event){
    event.valueChanges.subscribe(() => {
      this.resetLoadMore();
      this.searchFields = event.value;
      setTimeout(() => {
        this.removedSearchField = null;
      });
      if(!this.settings.searchOnBtnClick){
        this.properties.length = 0;
      }
    });
    event.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => {
      if(!this.settings.searchOnBtnClick){
        this.getProperties();
      }
    });
  }
  public removeSearchField(field){
    this.message = null;
    this.removedSearchField = field;
  }

  public searchProperties() {    
    console.log(this.searchPropertiesValues);
    this.uActionsService.buildURL(this.searchPropertiesValues);
    this.router.navigateByUrl('/propiedades?search=true');
  }

  public changeCount(count){
    this.count = count;
    this.resetLoadMore();
    this.properties.length = 0;
    this.getProperties();

  }
  public changeSorting(sort){
    this.sort = sort;
    this.resetLoadMore();
    this.properties.length = 0;
    this.getProperties();
  }
  public changeViewType(obj){
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol;
  }


  public getFeaturedProperties(){
    this.appService.getFeaturedProperties().subscribe(properties=>{
      this.featuredProperties = properties.response;
    })
  }

  public getSoonProperties(){
    this.appService.getSoonProperties().subscribe(properties=>{
      this.soonProperties = properties.response;
      console.log(this.soonProperties);
    })
  }

/*     public getAppearance(): MatFormFieldAppearance {
      return (this.variant != 3) ? 'outline' : 'fill';
   }
   public getFloatLabel(): FloatLabelType {
      return (this.variant == 1) ? 'always' : 'auto';
   } */

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

  getCategoryList(){
    this.publicService.categoryList()
      .subscribe(
        (response) => {
          this.categoryList = response.response;
        },
        (error) => {

        }
      )
  }

  setSearchProps(value: any, key: string) {
  console.log(value,key);
    this.searchPropertiesValues[key] = isNaN(parseInt(value)) ? value : parseInt(value);
  }

  navigateTo(route: string): void {
    window.location.href = route;
  }

  geocodeAddress(address: string,title:string,route:string,active_id,category,province): void {
    this.uActionsService.getCoordinates(address).subscribe(response => {
      if (response.status === 'OK') {
        const location = response.results[0].geometry.location;
        this.markerPositions.push({lat:location.lat,lng:location.lng,title:title,route:route,category:category,province:province});

        this.appService.saveLatLng({active_id,lat:location.lat,lng:location.lng}).subscribe(data=>{
          console.log('saved');
        });


      } else {
        console.error('Geocoding error:', response.status);
      }
    });
  }

  province_map:any;
  category_map:any;

  markersAux = [];

  filterMapMarkers()
  {
    if (!this.markersAux.length) {
      this.markersAux = this.markerPositions;
    }
    
    this.markerPositions = this.markersAux;

    console.log(this.markersAux,this.province_map, this.category_map);

    if (this.province_map && this.province_map != '' && this.province_map != 0) {
      console.log('aqui 1')
      this.markerPositions = this.markersAux.filter(x=>x.province == this.province_map);
    }

    if (this.category_map && this.category_map != '' && this.category_map != 0) {
      console.log('aqui 2')
      this.markerPositions = this.markersAux.filter(x=>x.category == this.category_map);
    }

    console.log(this.markerPositions);

  }

}
