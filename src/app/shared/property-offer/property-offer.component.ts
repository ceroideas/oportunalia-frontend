import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-offer',
  /* standalone: true,
  imports: [CommonModule], */
  templateUrl: './property-offer.component.html',
  styleUrl: './property-offer.component.scss'
})
export class PropertyOfferComponent implements OnInit {

  typeSubasta:any;

  @Input() auctionData: any;

  constructor() { }

  ngOnInit() {
  }


}
