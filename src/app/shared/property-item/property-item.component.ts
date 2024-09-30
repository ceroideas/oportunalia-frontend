import { Component, OnInit, Input, ViewChild, SimpleChange } from '@angular/core';
import { SwiperDirective, SwiperConfigInterface, SwiperPaginationInterface } from 'src/app/theme/components/swiper/swiper.module';
import { Settings, AppSettings } from '../../app.settings';

import { AppService } from '../../app.service';
import { CompareOverviewComponent } from '../compare-overview/compare-overview.component';
import moment from 'moment';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss']
})
export class PropertyItemComponent implements OnInit {
  @Input() property: any;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: number = 0;
  @Input() fullWidthPage: boolean = true;
  public column:number = 4;
  public title:string = "";
  // public address:string;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface = {};
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() { }

  ngAfterViewInit(){
    this.initCarousel();
    this.calculateLeftTime();
    // this.appService.getAddress(this.property.location.lat, this.property.location.lng).subscribe(data=>{
    //   console.log(data['results'][0]['formatted_address']);
    //   this.address = data['results'][0]['formatted_address'];
    // })
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    if(changes.viewColChanged){
      this.getColumnCount(changes.viewColChanged.currentValue);
      if(!changes.viewColChanged.isFirstChange()){
        if(this.property.images.length > 1){
           this.directiveRef.update();
        }
      }
    }

    for (let propName in changes) {
      // let changedProp = changes[propName];
      // if (!changedProp.isFirstChange()) {
      //   if(this.property.gallery.length > 1){
      //     this.initCarousel();
      //     this.config.autoHeight = true;
      //     this.directiveRef.update();
      //   }
      // }
    }
  }

  public getColumnCount(value){

    if(value == 25){
      this.column = 4;
      this.title = this.property.title;
    }
    else if(value == 33.3){  // grid 3 columnas
      this.column = 3;
      this.title = this.property.title.length >= 55 ? this.property.title.substring(0,54) + '...': this.property.title;
    }
    else if(value == 50){// cuadricula 2 columnas
      this.column = 2
      this.title = this.property.title.length >= 71 ? this.property.title.substring(0,70) + '...': this.property.title;
    }
    else{
      this.column = 1;  // apaisado
      this.title = this.property.title.length >= 71 ? this.property.title.substring(0,70) + '...': this.property.title;
    }


  }

  public getStatusBgColor(status){
    switch (status) {
      case 'Subasta':
        return '#A5D7DA';
      case 'Cesión de remate':
        return '#457B9D';
      case 'Venta directa':
        return '#3E606F';
      case 'Próximamente':
        return '#CCCCCC';
      case 'OFERTA':
      case 'Finalizada':
        return '#CA2828';
      default:
        return '#01579B';
    }
  }

  /* 'En curso'
  'Subasta'
  'Próximamente'
  'Cesión de remate'
  'Finalizada' */

  public getStatusColor(status){
    switch (status) {
      case 'Subasta' :
        return '#292C63';
      case 'Cesión de remate':
      case 'Venta directa':
      case 'OFERTA':
      case 'No vendida':
      case 'Finalizada':
      case 'En curso':
        return '#FFFF';
      case 'Próximamente':
        return '#4E4E4E';
      default:
        return '#292C63';
    }
  }


  public initCarousel(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: false,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      nested: true,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false
      // },
      speed: 500,
      effect: "slide"
    }
  }


  public addToCompare(){
    this.appService.addToCompare(this.property, CompareOverviewComponent, (this.settings.rtl) ? 'rtl':'ltr');
  }

  public onCompare(){
    return this.appService.Data.compareList.filter(item=>item.id == this.property.id)[0];
  }

  public addToFavorites(){
    this.appService.addToFavorites(this.property, (this.settings.rtl) ? 'rtl':'ltr');
  }

  public onFavorites(){
    return this.appService.Data.favorites.filter(item=>item.id == this.property.id)[0];
  }

  public calculateLeftTime(): void {
    const propertyCard: any = document.querySelector(`.left-time-${ this.property.guid }`);
    const timeToEnd: any = new Date(this.property.end_date);

    const interval = setInterval(() => {

      try {
        let leftTime: any = timeToEnd - (new Date() as any);
        const hours = moment(leftTime).format("HH:mm:ss");
        const days = moment(leftTime).format("DD");

        if (leftTime <= 0) {
          clearInterval(interval);
        }

        propertyCard.textContent = `${ days }D ${ hours }`;
      } catch (e) {
        console.log(e);
        clearInterval(interval);
      }
    }, 1000);
  }
}
