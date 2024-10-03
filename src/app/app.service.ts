import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Property, Location, Post } from './app.models';
import { AppSettings } from './app.settings';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from './shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { InfoDialogComponent } from './shared/info-dialog/info-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { DomHandlerService } from './dom-handler.service';
import { GlobalConstants } from './global-constants';
import { UserService } from './api/user.service';

export class Data {
  constructor(public properties: Property[],
              public compareList: Property[],
              public favorites: Property[],
              public locations: Location[],
              public post: Post[]) { }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public Data = new Data(
    [], // properties
    [], // compareList
    [], // favorites
    [],  // locations
    []
  )

  public url = environment.url + '/assets/data/';
  public apiKey = 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I';

  constructor(public http:HttpClient,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar,
              public appSettings:AppSettings,
              public dialog: MatDialog,
              public translateService: TranslateService,
              private domHandlerService: DomHandlerService,
              public userService: UserService) { }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  public getProperties(): Observable<any>{

    const paths: string[] = ['/auction?auction_status_id=1&featured=1&order=end_date__asc', '/auction?auction_status_id=7&featured=1&order=end_date__asc', '/auction?auction_status_id=1&auction_type_id=1&active_category_id=0&order=end_date__asc',
      '/auction?auction_status_id=7&auction_type_id=1&active_category_id=0&order=end_date__asc', '/auction?auction_status_id=1&featured=1&order=end_date__asc', '/auction?auction_status_id=7&featured=1&order=end_date__asc',
      '/auction?auction_status_id=1&auction_type_id=3&active_category_id=0&order=end_date__asc', '/auction?auction_status_id=7&auction_type_id=3&active_category_id=0&order=end_date__asc'];

    /* PATHS PARA AMBIENTE DE PRUEBAS  const paths: string[] = ['/auction?auction_type_id=1']; */

    return forkJoin(paths.map((path: string) => this.http.get(GlobalConstants.apiURL + path)));
  }

  public getPropertyById(id): Observable<any>{
    return this.http.get(GlobalConstants.apiURL + `/auction/${ id }`, { headers: { 'Authorization': this.getToken()}, });
  }

  public getPostById(id): Observable<any>{
    return this.http.get<Post>(`${ GlobalConstants.apiURL }/blog/${ id }`, { headers: { 'Authorization': this.getToken()}, });
  }

  public getFeaturedProperties(): Observable<any>{
    return this.http.get(GlobalConstants.apiURL + '/auction_last?auction_status_id=1&featured=1&order=end_date__asc');
  }

  public getRelatedProperties(): Observable<any[]>{
    return this.http.get<Property[]>(GlobalConstants.apiURL + '/auction_last?auction_status_id=1&related=1&order=end_date__asc');
  }

  public getPropertiesByAgentId(agentId): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'properties-agentid-' + agentId + '.json');
  }

  public getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.url + 'locations.json');
  }

  public getAddress(lat = 40.714224, lng = -73.961452){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey);
  }

  public getLatLng(address){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key='+this.apiKey+'&address='+address);
  }

  public getFullAddress(lat = 40.714224, lng = -73.961452){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey).subscribe(data =>{
      return data['results'][0]['formatted_address'];
    });
  }

  public addToCompare(property:Property, component, direction){
    if(!this.Data.compareList.filter(item=>item.id == property.id)[0]){
      this.Data.compareList.push(property);
      this.bottomSheet.open(component, {
        direction: direction
      }).afterDismissed().subscribe(isRedirect=>{
        if(isRedirect){
          this.domHandlerService.winScroll(0, 0);
        }
      });
    }
  }

  public addToFavorites(property: any, direction){
    console.log("app.service addToFavorites");
    this.userService.updateFavorite(property.link_rewrite.toString()).subscribe((_) => {

      if(!this.Data.favorites.filter(item=>item.id == property.id)[0]){
        this.Data.favorites.push(property);
      }

      this.snackBar.open('La propiedad "' + property.title + '" ha sido agregada a favoritos.', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction
      });
    });
    /* if(!this.Data.favorites.filter(item=>item.id == property.id)[0]){
      this.Data.favorites.push(property);
      this.snackBar.open('The property "' + property.title + '" has been added to favorites.', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: direction
      });
    } */
  }

  public openConfirmDialog(title:string, message:string) {
    const dialogData = new ConfirmDialogModel(title, message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    return dialogRef;
  }

  public openAlertDialog(message:string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: message
    });
    return dialogRef;
  }

  public showInfoMessage(message:string) {
    if(message=='deposit'){
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        maxWidth: "400px",
        data: message
      });
      return dialogRef;

    }else if(message=='error_register_user'){

      const dialogRef = this.dialog.open(InfoDialogComponent, {
        maxWidth: "400px",
        data: message
      });
      return dialogRef;

    }else{
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        maxWidth: "600px",
        data: message
      });
      return dialogRef;
    }


  }

  public getTranslateValue(key: string, param: string | null = null){
    let value: string | null = null;
    this.translateService.get(key, { param: param }).subscribe((res: string) => {
      value = res;
    })
    return value;
  }

  public getPropertyTypes(): Observable<any> {

    return this.http.get(GlobalConstants.apiURL + '/active_category/list');
/*     return [
      { id: 1, name: 'Oficina' },   // No puedes cambiar estos elementos hasta ver como hace las busquedas
      { id: 2, name: 'Casa' },
      { id: 3, name: 'Piso' }
    ] */
  }

  public getProvinces(){
    return this.http.get(GlobalConstants.apiURL + '/provinces/1').pipe(({ response }: any) => response);
    /* return [
      { id: 1, name: 'Madrid' },   // No puedes cambiar estos elementos hasta ver como hace las busquedas
      { id: 2, name: 'Barcelona' },
      { id: 3, name: 'Malaga' }
    ] */
  }

  public getPropertyStatuses(){
    return [
      { id: 1, name: 'Subasta' },
      { id: 2, name: 'Cesión de remate' },
      { id: 3, name: 'Venta directa' },
      { id: 4, name: 'Próximamente' },
      { id: 5, name: 'OFERTA' },
      { id: 6, name: 'Finalizada' }
    ]
  }

  public getCities(): Observable<any> {
    /* return [
      { id: 1, name: 'New York' },
      { id: 2, name: 'Chicago' },
      { id: 3, name: 'Los Angeles' },
      { id: 4, name: 'Seattle' }
    ] */
    return this.http.get(GlobalConstants.apiURL + '/province/1');
  }

  public getNeighborhoods(){
    return [
      { id: 1, name: 'Astoria', cityId: 1 },
      { id: 2, name: 'Midtown', cityId: 1 },
      { id: 3, name: 'Chinatown', cityId: 1 },
      { id: 4, name: 'Austin', cityId: 2 },
      { id: 5, name: 'Englewood', cityId: 2 },
      { id: 6, name: 'Riverdale', cityId: 2 },
      { id: 7, name: 'Hollywood', cityId: 3 },
      { id: 8, name: 'Sherman Oaks', cityId: 3 },
      { id: 9, name: 'Highland Park', cityId: 3 },
      { id: 10, name: 'Belltown', cityId: 4 },
      { id: 11, name: 'Queen Anne', cityId: 4 },
      { id: 12, name: 'Green Lake', cityId: 4 }
    ]
  }

  public getStreets(){
    return [
      { id: 1, name: 'Astoria Street #1', cityId: 1, neighborhoodId: 1},
      { id: 2, name: 'Astoria Street #2', cityId: 1, neighborhoodId: 1},
      { id: 3, name: 'Midtown Street #1', cityId: 1, neighborhoodId: 2 },
      { id: 4, name: 'Midtown Street #2', cityId: 1, neighborhoodId: 2 },
      { id: 5, name: 'Chinatown Street #1', cityId: 1, neighborhoodId: 3 },
      { id: 6, name: 'Chinatown Street #2', cityId: 1, neighborhoodId: 3 },
      { id: 7, name: 'Austin Street #1', cityId: 2, neighborhoodId: 4 },
      { id: 8, name: 'Austin Street #2', cityId: 2, neighborhoodId: 4 },
      { id: 9, name: 'Englewood Street #1', cityId: 2, neighborhoodId: 5 },
      { id: 10, name: 'Englewood Street #2', cityId: 2, neighborhoodId: 5 },
      { id: 11, name: 'Riverdale Street #1', cityId: 2, neighborhoodId: 6 },
      { id: 12, name: 'Riverdale Street #2', cityId: 2, neighborhoodId: 6 },
      { id: 13, name: 'Hollywood Street #1', cityId: 3, neighborhoodId: 7 },
      { id: 14, name: 'Hollywood Street #2', cityId: 3, neighborhoodId: 7 },
      { id: 15, name: 'Sherman Oaks Street #1', cityId: 3, neighborhoodId: 8 },
      { id: 16, name: 'Sherman Oaks Street #2', cityId: 3, neighborhoodId: 8 },
      { id: 17, name: 'Highland Park Street #1', cityId: 3, neighborhoodId: 9 },
      { id: 18, name: 'Highland Park Street #2', cityId: 3, neighborhoodId: 9 },
      { id: 19, name: 'Belltown Street #1', cityId: 4, neighborhoodId: 10 },
      { id: 20, name: 'Belltown Street #2', cityId: 4, neighborhoodId: 10 },
      { id: 21, name: 'Queen Anne Street #1', cityId: 4, neighborhoodId: 11 },
      { id: 22, name: 'Queen Anne Street #2', cityId: 4, neighborhoodId: 11 },
      { id: 23, name: 'Green Lake Street #1', cityId: 4, neighborhoodId: 12 },
      { id: 24, name: 'Green Lake Street #2', cityId: 4, neighborhoodId: 12 }
    ]
  }

  public getFeatures(){
    return [
      { id: 1, name: 'Campo', selected: false },
      { id: 2, name: 'Barbacoa', selected: false },
      { id: 3, name: 'Ciudad', selected: false },
      { id: 4, name: 'Edificios', selected: false },
      { id: 5, name: 'Playa', selected: false },
      { id: 6, name: 'TV Cable', selected: false },
      { id: 7, name: 'Piscina', selected: false },
      { id: 8, name: 'WiFi', selected: false },
      { id: 9, name: 'Cabañas', selected: false },
      { id: 10, name: 'Golf', selected: false },
      { id: 11, name: 'Gimnasio', selected: false },
    ]
  }


  public getHomeCarouselSlides(){
    return this.http.get<any[]>(this.url + 'slides.json');
  }


  public filterData(data: any, params: any, sort?: any, page?: any, perPage?: any){

    if(params){

      if(params.propertyType){
        data = data.filter(property => property?.active_category_id?.toString() == params?.propertyType?.id?.toString())
      }

      if(params.propertyStatus && params.propertyStatus.length){
        let statuses: any[] = [];
        params.propertyStatus.forEach((status: any) => { statuses.push(status.name) });

        let properties: any[] = [];

       /*  data.filter((property: any) =>
          property.propertyStatus.forEach((status: any) => {
            if(statuses.indexOf(status) > -1){
              if(!properties.includes(property)){
                properties.push(property);
              }
            }
          })
        ); */

        for (let i = 0; i < data.length; i++) {

          const { type } = data[i];

          if (!type) continue;

          for (let x = 0; x < params.propertyStatus.length; x++) {

            if (params.propertyStatus[x]?.name?.toUpperCase().trim() === type?.toUpperCase().trim()) {

              properties.push(data[i]);
            }
          }
        }

        console.log(properties);

        data = properties;

      }

      if(params.price){
        if(this.appSettings.settings.currency == 'USD'){
          if(params.price.from){
            data = data.filter(property => {
              if(property.priceDollar.sale && property.priceDollar.sale >= params.price.from ){
                return true;
              }
              if(property.priceDollar.rent && property.priceDollar.rent >= params.price.from ){
                return true;
              }
              return false;
            });
          }
          if(params.price.to){
            data = data.filter(property => {
              if(property.priceDollar.sale && property.priceDollar.sale <= params.price.to){
                return true;
              }
              if(property.priceDollar.rent && property.priceDollar.rent <= params.price.to){
                return true;
              }
              return false;
            });
          }
        }
        if(this.appSettings.settings.currency == 'EUR'){
          if(params.price.from){
            data = data.filter(property => {
              if(property.priceEuro.sale && property.priceEuro.sale >= params.price.from ){
                return true;
              }
              if(property.priceEuro.rent && property.priceEuro.rent >= params.price.from ){
                return true;
              }
              return false;
            });

          }
          if(params.price.to){
            data = data.filter(property => {
              if(property.priceEuro.sale && property.priceEuro.sale <= params.price.to){
                return true;
              }
              if(property.priceEuro.rent && property.priceEuro.rent <= params.price.to){
                return true;
              }
              return false;
            });
          }
        }
      }

      if(params.city){
        data = data.filter(property => property.city == params.city.name)
      }

      if(params.zipCode){
        data = data.filter(property => property.zipCode == params.zipCode)
      }

      if(params.neighborhood && params.neighborhood.length){
        let neighborhoods: any[] = [];
        params.neighborhood.forEach(item => { neighborhoods.push(item.name) });
        let properties: any[] = [];
        data.filter((property: any) =>
          property.neighborhood.forEach((item: any) => {
            if(neighborhoods.indexOf(item) > -1){
              if(!properties.includes(property)){
                properties.push(property);
              }
            }
          })
        );
        data = properties;
      }

      if(params.street && params.street.length){
        let streets: any[] = [];
        params.street.forEach(item => { streets.push(item.name) });
        let properties: any[] = [];
        data.filter(property =>
          property.street.forEach(item => {
            if(streets.indexOf(item) > -1){
              if(!properties.includes(property)){
                properties.push(property);
              }
            }
          })
        );
        data = properties;
      }

      if(params.bedrooms){
        if(params.bedrooms.from){
          data = data.filter(property => property.bedrooms >= params.bedrooms.from)
        }
        if(params.bedrooms.to){
          data = data.filter(property => property.bedrooms <= params.bedrooms.to)
        }
      }

      if(params.bathrooms){
        if(params.bathrooms.from){
          data = data.filter(property => property.bathrooms >= params.bathrooms.from)
        }
        if(params.bathrooms.to){
          data = data.filter(property => property.bathrooms <= params.bathrooms.to)
        }
      }

      if(params.garages){
        if(params.garages.from){
          data = data.filter(property => property.garages >= params.garages.from)
        }
        if(params.garages.to){
          data = data.filter(property => property.garages <= params.garages.to)
        }
      }

      if(params.area){
        if(params.area.from){
          data = data.filter(property => property.area.value >= params.area.from)
        }
        if(params.area.to){
          data = data.filter(property => property.area.value <= params.area.to)
        }
      }

      if(params.yearBuilt){
        if(params.yearBuilt.from){
          data = data.filter(property => property.yearBuilt >= params.yearBuilt.from)
        }
        if(params.yearBuilt.to){
          data = data.filter(property => property.yearBuilt <= params.yearBuilt.to)
        }
      }

      if(params.features){
        let arr: any[] = [];
        params.features.forEach(feature => {
          if(feature.selected)
            arr.push(feature.name);
        });
        if(arr.length > 0){
          let properties: any[] = [];
          data.filter(property =>
            property.features.forEach(feature => {
              if(arr.indexOf(feature) > -1){
                if(!properties.includes(property)){
                  properties.push(property);
                }
              }
            })
          );
          data = properties;
        }

      }

    }
    console.log("app.service filterData: ");
    this.sortData(sort, data);
    return this.paginator(data, page, perPage);
  }

  public sortData(sort, data){
    if(sort){
      switch (sort) {
        case 'Newest':
          data = data.sort((a, b)=> {return <any>new Date(b.published) - <any>new Date(a.published)});
          break;
        case 'Oldest':
          data = data.sort((a, b)=> {return <any>new Date(a.published) - <any>new Date(b.published)});
          break;
        case 'Popular':
          data = data.sort((a, b) => {
            if(a.ratingsValue/a.ratingsCount < b.ratingsValue/b.ratingsCount){
              return 1;
            }
            if(a.ratingsValue/a.ratingsCount > b.ratingsValue/b.ratingsCount){
              return -1;
            }
            return 0;
          });
          break;
        case 'Price (Low to High)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;
            })
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.v.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;
            })
          }
          break;
        case 'Price (High to Low)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;
            })
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.v.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;
            })
          }
          break;
        default:
          break;
      }
    }
    return data;
  }

  public paginator(items, page?, perPage?) {
    var page = page || 1,
    perPage = perPage || 4,
    offset = (page - 1) * perPage,
    paginatedItems = items.slice(offset).slice(0, perPage),
    totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination:{
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      }
    };
  }



  public getTestimonials(){
    return [
        {   title: 'Regístrate',
            text: 'Lo primero que tendrás que hacer para participar será registrarte de manera completamente gratuita.',
            text2: 'Una vez registrado, podrás hacer ofertas y realizar pujas.',
            author: 'Author',
            position: 'Position',
            image: 'assets/images/others/como-comprar-1.png'
        },
        {   title: 'Oferta',
            text: 'Localiza en nuestra web el inmueble en el que estás interesado y realiza una oferta. Durante todo el proceso estarás acompañado por el equipo de profesionales de Oportunalia y podrás seguir el estado de tu oferta en tiempo real.',
            text2: 'Ten en cuenta que, en las subastas, cualquier puja en último minuto alargará la duración de la subasta dos minutos más.',
            author: 'Author',
            position: 'Position',
            image: 'assets/images/others/como-comprar-2.png'
        },
        {   title: 'Mejor puja u oferta',
            text: 'Una vez finalizada la subasta, si eres el mejor postor, nos pondremos en contacto contigo para comenzar con el proceso de adjudicación.',
            text2: 'Una vez finalizada la venta directa / cesión de remate, si tu oferta es la más alta, nos pondremos en contacto contigo para indicarte los pasos a seguir.',
            author: 'Author',
            position: 'Position',
            image: 'assets/images/others/como-comprar-3.png'
        }
    ];
  }

  public getAgents(){
    return [
        {
            id: 1,
            fullName: 'Lusia Manuel',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
            organization: 'oportunalia',
            email: 'lusia.m@oportunalia.com',
            phone: '(224) 267-1346',
            social: {
              facebook: 'lusia',
              twitter: 'lusia',
              linkedin: 'lusia',
              instagram: 'lusia',
              website: 'https://lusia.manuel.com'
            },
            ratingsCount: 6,
            ratingsValue: 480,
            image: 'assets/images/agents/a-1.jpg'
        },
        {
            id: 2,
            fullName: 'Andy Warhol',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
            organization: 'oportunalia',
            email: 'andy.w@oportunalia.com',
            phone: '(212) 457-2308',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: 'https://andy.warhol.com'
            },
            ratingsCount: 4,
            ratingsValue: 400,
            image: 'assets/images/agents/a-2.jpg'
        },
        {
            id: 3,
            fullName: 'Tereza Stiles',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
            organization: 'oportunalia',
            email: 'tereza.s@oportunalia.com',
            phone: '(214) 617-2614',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: 'https://tereza.stiles.com'
            },
            ratingsCount: 4,
            ratingsValue: 380,
            image: 'assets/images/agents/a-3.jpg'
        },
        {
          id: 4,
          fullName: 'Michael Blair',
          desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
          organization: 'oportunalia',
          email: 'michael.b@oportunalia.com',
          phone: '(267) 388-1637',
          social: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: '',
            website: 'https://michael.blair.com'
          },
          ratingsCount: 6,
          ratingsValue: 480,
          image: 'assets/images/agents/a-4.jpg'
        },
        {
            id: 5,
            fullName: 'Michelle Ormond',
            desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
            organization: 'oportunalia',
            email: 'michelle.o@oportunalia.com',
            phone: '(267) 388-1637',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              website: 'https://michelle.ormond.com'
            },
            ratingsCount: 6,
            ratingsValue: 480,
            image: 'assets/images/agents/a-5.jpg'
        }
    ];
  }



  public getClients(){
    return [
        { name: 'idealista', image: 'assets/images/clients/idealista.png' },
        { name: 'lawyer', image: 'assets/images/clients/lawyer.png' },
        { name: 'opress', image: 'assets/images/clients/opress.png' },
        { name: 'vanguardia', image: 'assets/images/clients/vanguardia.png' }
/*         { name: 'original', image: 'assets/images/clients/original.png' },
        { name: 'retro', image: 'assets/images/clients/retro.png' },
        { name: 'king', image: 'assets/images/clients/king.png' },
        { name: 'love', image: 'assets/images/clients/love.png' },
        { name: 'the', image: 'assets/images/clients/the.png' },
        { name: 'easter', image: 'assets/images/clients/easter.png' },
        { name: 'with', image: 'assets/images/clients/with.png' },
        { name: 'special', image: 'assets/images/clients/special.png' },
        { name: 'bravo', image: 'assets/images/clients/bravo.png' } */
    ];
  }


}
