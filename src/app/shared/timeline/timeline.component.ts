import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  /*standalone: true,
  imports: [CommonModule],*/
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {

  selectedStep = 1;

  config = {
    observer: true,
    slidesPerView: 1,
    spaceBetween: 0,       
    keyboard: true,
    // navigation: { nextEl: '.prop-next', prevEl: '.prop-prev'},
    pagination: true,
    grabCursor: true,        
    loop: false,
    preloadImages: true,
    lazy: false,    
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

  textos = [
    {
      step: "Paso 1",
      title: "Haz tu oferta",
      desc: "Tras localizar en nuestra web el producto en el que estás interesado, podrás hacer una oferta conforme a las condiciones especificadas en la descripción del activo."
    },
    {
      step: "Paso 2",
      title: "Revisión de la oferta",
      desc: "El equipo de Oportunalia revisará tu oferta y confirmará si ha sido aprobada."
    },
    {
      step: "Paso 3",
      title: "Adjudicación",
      desc: "Una vez aprobada la oferta, se seguirán los trámites judiciales correspondientes."
    },
    {
      step: "Paso 4",
      title: "Toma de posesión y llave en mano",
      desc: "Tras la adjudicación del inmueble se llevará a cabo la toma de posesión y te entregaremos las llaves."
    },
    {
      step: "Paso 5",
      title: "Inscripción del inmueble",
      desc: "El equipo de Oportunalia se encargará de inscribir el inmueble a tu nombre en el Registro de la Propiedad. "
    },
    {
      step: "Paso 6",
      title: "Reforma del inmueble (Servicio adicional) ",
      desc: "Se ofrecerá un servicio de reforma del inmueble dependiendo de tus preferencias y necesidades."
    },
  ];


  constructor(){}

  ngOnInit() {

  }

  selectStep(i)
  {
    this.selectedStep = i;
  }

}
