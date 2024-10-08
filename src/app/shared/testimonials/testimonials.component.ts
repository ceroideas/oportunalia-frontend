import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'src/app/theme/components/swiper/swiper.module';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  public testimonials;
  public config: SwiperConfigInterface = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  
  constructor(public appService:AppService) { }
  
  @ViewChild('swiper') swiper: any; // Reference to the Swiper instance

  ngOnInit() {
    this.testimonials = this.appService.getTestimonials();
  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      /* navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      } */
       /*breakpoints: {
         480: {
           slidesPerView: 1
         },
         740: {
           slidesPerView: 2,
         },
         960: {
           slidesPerView: 3,
         }
       }*/
    }
  }


  previousSlide() {
    if (this.swiper) {      
      this.swiper.slidePrev();
    }
  }

  nextSlide() {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  }
}
