import { Component, OnInit } from '@angular/core';

import { SwiperConfigInterface, SwiperPaginationInterface } from 'src/app/theme/components/swiper/swiper.module';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-how-to-buy',
  templateUrl: './how-to-buy.component.html',
  styleUrl: './how-to-buy.component.scss'
})
export class HowToBuyComponent implements OnInit{

  public clients;
  public config: SwiperConfigInterface = { };
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  constructor(public appService:AppService) { }

  ngOnInit() {
    this.clients = this.appService.getClients();
  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      //pagination: false,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      //effect: "slide",
      breakpoints: {
        320: {
          slidesPerView: 1//2
        },
        480: {
          slidesPerView: 1//2//3
        },
        600: {
          slidesPerView: 1//3//4
        },
        960: {
          slidesPerView: 1//4//5
        },
        1280: {
          slidesPerView: 1//4//6
        },
        1500: {
          slidesPerView: 1//4//7
        }
      }
    }
  }
}
