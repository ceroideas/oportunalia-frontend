import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionService } from 'src/app/api/auction.service';

@Component({
  selector: 'app-property-offer',
  /* standalone: true,
  imports: [CommonModule], */
  templateUrl: './property-offer.component.html',
  styleUrl: './property-offer.component.scss'
})
export class PropertyOfferComponent implements OnInit {

  typeSubasta:any;
  auctionDetail = {
    depositRequired: true,
    deposit: 0,
    depositStatus:0,
    interval:0,
    valorTasacion: 0,
    precioMinimo: 0,
    start_price: 0,
    comision: 0,
    ubicacion: "",
    address: "",
    reembolsos: "No",
    condicion: "",
    frontImage: "/assets/auction/default.jpg",
    carrouselImages: [ "/assets/auction/default.jpg" , "/assets/auction/default.jpg" , "/assets/auction/default.jpg" ],
    auctionType: 2,
    status: "",
    endDate: "",
    seconds_to_end: 0,
    startDate:"",
    currentBid: 0,
    currentWinner: "",
    bidCount: 0,
    userLastBid: "",
    userIsLastBidder: false,
    title: "",
    video: "",
    video_file: "",
    dontshowtimer:1,
  }

  bidImport=0;
  auctionEnded = false;
  directOfferImport=0;
  carruselFinalizadas: any;

  @Input() auctionData: any;

  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
    //this.getAuctionDetail();
    this.typeSubasta = "Tipo de subasta";
    this.auctionData;
    console.log("Property-offer init");
    console.log(this.typeSubasta);
    console.log(this.auctionData);
    console.log("getFinalizadasList");
    this.getFinalizadasList();

  }

  getFinalizadasList(){
    let params = {
      search:"",
      auction_status_id:"",
      auction_type_id:"",
      active_category_id:"",
      order:"end_date__asc",
      featured:"1",
    }
    this.auctionService.auctionFinished( params , localStorage.getItem("userLoggedToken") )
    .subscribe(
      (response) => {
        this.carruselFinalizadas = response.response;
      },
      (error) => {

      }
    )
  }

  getAuctionDetail(){
    this.auctionService.auctionDetailLogged(this.auctionData.link_rewrite , localStorage.getItem("userLoggedToken") )
    .subscribe(
      (response) => {
        this.auctionDetail.title = response.response.title;
        if( response.response.type == "Subasta" ){this.auctionDetail.auctionType=2;}
        if( response.response.type == "Venta Directa" ){this.auctionDetail.auctionType=3;}
        if( response.response.type == "Cesión de Remate" ){this.auctionDetail.auctionType=5;}
        if( response.response.status == "Próximamente" ){this.auctionDetail.auctionType=1;}
        if( response.response.status == "En curso" || response.response.status == "Próximamente"){ this.auctionEnded = false}
        this.auctionDetail.status == response.response.status;
        this.auctionDetail.endDate = response.response.end_date;
        this.auctionDetail.startDate = response.response.start_date;
        this.auctionDetail.seconds_to_end = response.response.seconds_to_end;
        if(response.response.deposit==null || response.response.deposit==0){
          this.auctionDetail.depositRequired = false;
        }else{
          this.auctionDetail.depositRequired = true;
          this.auctionDetail.deposit = response.response.deposit;
          this.auctionDetail.depositStatus = response.response.deposit_status_id;
        }

        this.auctionDetail.valorTasacion = response.response.appraisal_value;
        if(response.response.minimum_bid==null || response.response.minimum_bid==0){
          this.auctionDetail.precioMinimo = 1;
        }else{
          this.auctionDetail.precioMinimo = response.response.minimum_bid;
        }
        this.directOfferImport = this.auctionDetail.precioMinimo;
        this.auctionDetail.start_price = response.response.start_price;
        this.auctionDetail.comision = response.response.commission;
        this.auctionDetail.ubicacion = response.response.city + ", " + response.response.province;
        if(response.response.refound==0){this.auctionDetail.reembolsos="Sí"}else{this.auctionDetail.reembolsos="No";}
        this.auctionDetail.condicion = response.response.active_condition;
        if(response.response.images.length>0){


          this.auctionDetail.frontImage = response.response.images[0].path;
          if(response.response.images.length>1){
            for (let index = 0; index < response.response.images.length; index++) {
              this.auctionDetail.carrouselImages[index] = response.response.images[index].path
            }
          }


        }
        this.auctionDetail.address = response.response.address;

        this.auctionDetail.dontshowtimer = response.response.dontshowtimer;

        this.auctionDetail.currentBid = response.response.max_bid;
        this.auctionDetail.currentWinner = response.response.max_bidder;
        this.auctionDetail.bidCount = response.response.bids;
        this.auctionDetail.userLastBid = response.response.my_last_bid;
        this.auctionDetail.userIsLastBidder = response.response.i_am_last_bidder;
        this.auctionDetail.interval = response.response.bid_price_interval;
        this.bidImport = this.auctionDetail.currentBid;
        if(this.auctionDetail.currentBid==null){
          this.bidImport = this.auctionDetail.precioMinimo;
        }else{
          this.bidImport = this.auctionDetail.currentBid+this.auctionDetail.interval;
        }

      },
      (error) => {

      }
    )
}


}
