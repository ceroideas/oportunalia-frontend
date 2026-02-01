import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { PublicService } from 'src/app/api/public.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-offers',
  /*standalone: true,
  imports: [CommonModule],*/
  templateUrl: './modal-offers.component.html',
  styleUrl: './modal-offers.component.scss'
})
export class ModalOffersComponent implements OnInit {

  offers:any;
  // public sidenavOpen:boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public viewCol: number = 33.33;
  public viewType: string = 'grid';
  public watcher: Subscription;

  constructor(private publicService: PublicService,public mediaObserver: MediaObserver, public dialogRef: MatDialogRef<ModalOffersComponent>){
    this.watcher = mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {
      if (change.mqAlias == 'xs') {
        // this.sidenavOpen = false;
        this.viewCol = 100;
      }
      else if(change.mqAlias == 'sm'){
        // this.sidenavOpen = false;
        this.viewCol = 50;
      }
      else if(change.mqAlias == 'md'){
        this.viewCol = 50;
        // this.sidenavOpen = true;
      }
      else{
        this.viewCol = 33.33;
        // this.sidenavOpen = true;
      }
    });
  }

  ngOnInit() {
    this.getOffersList();
  }

  getOffersList(){
    /*this.publicService.offersList()
      .subscribe(
        (response) => {
          this.offers = response.response;
          console.log(this.offers);
        },
        (error) => {

        }
      )*/
  }

  closeModal(){
    this.dialogRef.close(true as boolean);
  }

}
