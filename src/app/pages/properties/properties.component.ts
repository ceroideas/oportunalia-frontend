import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Settings, AppSettings } from '../../app.settings';
import { AppService } from '../../app.service';
import { Property, Pagination, Location } from '../../app.models';
import { DomHandlerService } from 'src/app/dom-handler.service';
import { ActivatedRoute } from '@angular/router';
import { UactionsService } from 'src/app/services/uactions.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MarkerClustererOptions } from '@angular/google-maps';

import { SnackbarComponent } from '../../custom/snackbar/snackbar.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public properties: Property[] = [];
  public viewType: string = 'list';
  public viewCol: number = 33.3;
  public count: number = 12;
  public sort: string;
  public searchFields: any;
  public removedSearchField: string | null;
  public pagination:Pagination = new Pagination(localStorage.getItem('actualPage') ? parseInt(localStorage.getItem('actualPage')) : 1, this.count, null, 2, 0, 0);
  public message:string | null;
  public watcher: Subscription;
  custom = true;
  openFilter = false;
  public pageIndex = localStorage.getItem('actualPage') ? parseInt(localStorage.getItem('actualPage'))-1 : 0;

  lat = this.getLat();
  lng = this.getLng();

  regulador = 0;

  center: google.maps.LatLngLiteral = { lat: this.lat, lng: this.lng };
  zoom: number = this.getZoomLevel();
  markerOptions: google.maps.MarkerOptions = { draggable: false, icon: {url:'assets/marker.png', scaledSize: new google.maps.Size(60, 60)} };
  markerOptions2: google.maps.MarkerOptions = { draggable: false, icon: {url:'assets/newmarker.png', scaledSize: new google.maps.Size(60, 60)}, zIndex:9999999 };
  markerPositions: { lat: number, lng: number, title: string, route: string, category: number, province: string, start_price: string}[] = [];

  newmarker:any;

  markerPositionsAux: { lat: number, lng: number, title: string, route: string, category: number, province: string, start_price: string}[] = [];

  mapOptions: google.maps.MapOptions = {
    fullscreenControl: true,
    mapTypeControl: true,
    gestureHandling: 'greedy'
  }

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

  markerClustererImagePath =
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  navigateTo(route: string): void {
    window.location.href = route;
  }

  restoreMap()
  {
    this.newmarker = null;
    console.log('restore')
    if (this.markerPositionsAux.length) {
      this.markerPositions = this.markerPositionsAux;
      // this.zoom = this.getZoomLevel();
      this.center = { lat: this.lat, lng: this.lng };
    }
  }

  changeCenter(i) {

    this.zoom = this.getZoomLevel();
    this.newmarker = {lat:parseFloat(i.lat),lng:parseFloat(i.lng),title:i.title,route:'/propiedades/'+i.link_rewrite,category:i.active_category_id, province:i.province, start_price: i.start_price};

    /*if (this.center.lat != lat && this.center.lng != lng) {
      if (this.markerPositions.length > 1) {
        this.markerPositionsAux = this.markerPositions;
      }
      this.markerPositions = [];
      this.markerPositions = [this.markerPositionsAux.find(x=>x.lat == lat && x.lng == lng && x.title == title)];

      this.zoom = 5;
      // this.center = {lat:parseFloat(lat), lng:parseFloat(lng)};
    }*/
  }

  public settings: Settings
  constructor(public appSettings:AppSettings,
              public appService:AppService,
              public mediaObserver: MediaObserver,
              public route: ActivatedRoute,
              public router: Router,
              private snackBar: MatSnackBar,
              public uactions: UactionsService,
              private domHandlerService: DomHandlerService) {
    this.settings = this.appSettings.settings;
    this.watcher = mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {
      if (change.mqAlias == 'xs') {
        this.sidenavOpen = false;
        this.viewCol = 100;
      }
      else if(change.mqAlias == 'sm'){
        this.sidenavOpen = false;
        this.viewCol = 50;
      }
      else if(change.mqAlias == 'md'){
        this.viewCol = 50;
        this.sidenavOpen = true;
      }
      else{
        this.viewCol = 33.3;
        this.sidenavOpen = true;
      }
    });
  }

  filter = null;
  bgImage = 'assets/images/propiedades.jpg';

  fixedMap = false;
  atFooter = false;

  @HostListener('window:scroll', [])
    onWindowScroll() {
      const scrollTop = Math.max(this.domHandlerService.window?.pageYOffset, this.domHandlerService.winDocument.documentElement.scrollTop, this.domHandlerService.winDocument.body.scrollTop);

      // Obtén la altura del documento y la posición del footer
      const documentHeight = this.domHandlerService.winDocument.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const footerOffsetTop = document.querySelector('footer')?.offsetTop;

      // Verifica si el scroll ha alcanzado el footer
      const isAtFooter = (scrollTop + viewportHeight) >= (footerOffsetTop-900 || documentHeight);

      if (scrollTop > (window.innerHeight/2)+this.regulador) {
        this.fixedMap = true;
      } else {
        this.fixedMap = false;
      }

      if (isAtFooter) {
        this.atFooter = true; // Cambia la variable cuando llegue al footer
      } else {
        this.atFooter = false;
      }
  }


  ngOnInit() {

    this.route.queryParams.subscribe(params => { this.sort = (+params['ofertas'] ? 'Mayor a menor descuento' : ''); });
    console.log(this.sort);


    console.log("getProperties OnInit");
    console.log(this.router.url);
    this.filter = this.router.url;

    if (this.filter == '/subasta') {
      this.bgImage = 'assets/images/subasta.jpg';
      this.regulador = 100;
    }
    if (this.filter == '/venta-directa') {
      this.bgImage = "assets/images/venta.jpg";
      this.regulador = 100;
    }
    if (this.filter == '/cesion-de-remate') {
      this.bgImage = "assets/images/cesion.jpg";
      this.regulador = 100;
    }

    if (localStorage.getItem('actualFilter') != this.filter) {
      localStorage.setItem('actualPage','1');
      localStorage.removeItem('actualFilter');
    }

    this.getProperties();
  }

  ngOnDestroy(){
    this.watcher.unsubscribe();
  }

  removeDuplicates(properties: Property[]): Property[] {
    return properties.filter((property, index, self) =>
      index === self.findIndex((t) => (
        t.id === property.id
      ))
    );
  }

  loaded = false;

  public getProperties(reset: boolean = false){
    
    const search = this.route.snapshot.queryParamMap.has('search');
    const origin = search && !reset ? this.uactions.searchFilter() : this.appService.getProperties();

    console.log('get properties')

    origin.subscribe(data => {

      console.log('origin data')
                
      data = data.map(data => data?.response ? data.response : data);
      data = [].concat(...data);

      let result = this.filterData(this.removeDuplicates(data));
      let result2 = this.allData(this.removeDuplicates(data));

      console.log(result2)

      if (!this.loaded) {
        for(let i of result2.data) {
          if (!i.lat || !i.lng) {
            this.geocodeAddress(i.city+', '+i.address+', '+i.province+', España',i.title,'/propiedades/'+i.link_rewrite,i.active_id, i.active_category_id, i.province,i.start_price);
          }else{
            this.markerPositions.push({lat:parseFloat(i.lat),lng:parseFloat(i.lng),title:i.title,route:'/propiedades/'+i.link_rewrite,category:i.active_category_id, province:i.province, start_price: i.start_price});
          }
        }
        this.loaded = true;
      }

      if(result.data.length == 0){
        this.properties.length = 0;
        this.pagination = new Pagination(localStorage.getItem('actualPage') ? parseInt(localStorage.getItem('actualPage')) : 1, this.count, null, 2, 0, 0);
        this.message = 'No hay resultados';
      } else {
        this.properties = result.data;
        this.pagination = result.pagination;
        this.message = null;
      }

    })
  }

  geocodeAddress(address: string,title:string,route:string,active_id,category,province,start_price): void {
    this.uactions.getCoordinates(address).subscribe(response => {
      if (response.status === 'OK') {
        const location = response.results[0].geometry.location;
        this.markerPositions.push({lat:location.lat,lng:location.lng,title:title,route:route,category:category,province:province,start_price:start_price});

        this.appService.saveLatLng({active_id,lat:location.lat,lng:location.lng}).subscribe(data=>{
          console.log('saved');
        });


      } else {
        console.error('Geocoding error:', response.status);
      }
    });
  }

  public resetPagination(){

    const search = this.route.snapshot.queryParamMap.has('search');        

    if (search) {
      this.getProperties(true);
    } else {

      if(this.paginator){
        this.paginator.pageIndex = 0;
      }
      this.pagination = new Pagination(localStorage.getItem('actualPage') ? parseInt(localStorage.getItem('actualPage')) : 1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
    }
  }

  public filterData(data){
    console.log('filterData',this.pagination.page)
    return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage, this.filter);
  }

  public allData(data){
    console.log('allData')
    return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage, this.filter,true);
  }

  public searchClicked(){
    this.openFilter = false;
    this.properties.length = 0;
    this.getProperties();
    this.domHandlerService.winScroll(0, 0);
  }
  public searchChanged(event){
    
    event.valueChanges.subscribe(() => {

      localStorage.removeItem('actualPage');
      this.pageIndex = 0;

      this.resetPagination();
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
        console.log('search');
        
        this.markerPositions = [];
        this.loaded = false;

        this.getProperties();
      }
    });
  }
  public removeSearchField(field){
    this.message = null;
    this.removedSearchField = field;
  }


  public changeCount(count){
    this.count = count;
    this.properties.length = 0;
    this.resetPagination();
    this.getProperties();
  }
  public changeSorting(sort){
    this.sort = sort;
    this.properties.length = 0;
    this.getProperties();
  }
  public changeViewType(obj){
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol;
  }


  public onPageChange(e){
    this.pagination.page = e.pageIndex + 1;
    localStorage.setItem('actualPage',this.pagination.page.toString());
    localStorage.setItem('actualFilter',this.filter);
    this.getProperties();
    this.domHandlerService.winScroll(0, 0);
  }

  copyUrl(url)
  {
    navigator.clipboard.writeText(url)
    .then(() => {
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['success'],
        data: { message: 'URL copiada al portapapeles' }
      });
    })
    .catch(err => {
      console.error('Error al copiar al portapapeles:', err)
    })
  }

}
