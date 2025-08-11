import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'src/app/theme/components/swiper/swiper.module';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public clients;
  public certificados;
  public config: SwiperConfigInterface = { };
  public config2: SwiperConfigInterface = { };
  constructor(public appService:AppService) { }

  ngOnInit() {
    this.clients = this.appService.getClients();
    this.certificados = this.appService.getCertificados();
  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 7,
      spaceBetween: 32,
      keyboard: true,
      navigation: false,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide",
      breakpoints: {
        320: {
          slidesPerView: 2
        },
        480: {
          slidesPerView: 2//3
        },
        600: {
          slidesPerView: 3//4
        },
        960: {
          slidesPerView: 4//5
        },
        1280: {
          slidesPerView: 4//6
        },
        1500: {
          slidesPerView: 4//7
        }
      }
    }

    this.config2 = {
      observer: true,
      slidesPerView: 2,
      spaceBetween: 64,
      keyboard: true,
      navigation: false,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide",
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 1//3
        },
        600: {
          slidesPerView: 2//4
        },
        960: {
          slidesPerView: 2//5
        },
        1280: {
          slidesPerView: 2//6
        },
        1500: {
          slidesPerView: 2//7
        }
      }
    }
  }

}
