import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'src/app/theme/components/swiper/swiper.module';

import { HttpClient } from '@angular/common/http';

declare var moment:any;

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {

  public config: SwiperConfigInterface = {}; 
  public config_2: SwiperConfigInterface = {}; 
  posts:any = [];
  ratings:any = [];
  // apiUrl:any = '/google-api/maps/api/place/details/json?place_id=ChIJ1U_waTRGOKERcVtat3bJMmQ&fields=name,rating,reviews&key=AIzaSyALrXOtjf-VGndljqeKZsA07bJJ8F0XwQw';
  apiUrl:any = 'https://oportunalia.com/api/test';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    fetch('https://oportunalia.com/oportunidades-inmobiliarias/wp-json/wp/v2/posts?_embed&per_page=5')
    .then(response => response.json())
    .then(data => {

      this.posts = data;
      moment().locale("es");
      this.posts.forEach(post => {
        post.new_date = moment(post.date).format('LL');
      });
    })
    .catch(error => console.error('Error:', error));


    this.getPlaceDetails().subscribe((data:any) => {
      console.log(data);
      this.ratings = data.reviews;

      let bgs = [
        "bg-card-subasta",
        "bg-card-venta",
        "bg-card-cesion"
      ];

      let i = 0;

      this.ratings.forEach(rate=>{
        rate.bg = bgs[i];
        if (bgs[i+1] !== undefined) {
          i++
        }else{
          i=0;
        }
      })
    });
  }

  getPlaceDetails() {
    return this.http.get(`${this.apiUrl}`);
  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 16,
      keyboard: true,
      navigation: { nextEl: '.prop-next', prevEl: '.prop-prev'},
      pagination: false,
      grabCursor: true,        
      loop: true,
      preloadImages: true,
      lazy: false,   
      autoplay: true, 
      breakpoints: { 
        320: {
          slidesPerView: 1
        },
        600: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 3
        }
      }
    }

    this.config_2 = {
      observer: true,
      slidesPerView: 1,
      spaceBetween: 32,
      keyboard: true,
      navigation: { nextEl: '.prop-next', prevEl: '.prop-prev'},
      pagination: false,
      grabCursor: true,        
      // loop: true,
      preloadImages: true,
      lazy: false,   
      // autoplay: true, 
      breakpoints: { 
        320: {
          slidesPerView: 1
        },
        600: {
          slidesPerView: 1
        },
        960: {
          slidesPerView: 1
        },
        1280: {
          slidesPerView: 1
        }
      }
    }
  }

}
