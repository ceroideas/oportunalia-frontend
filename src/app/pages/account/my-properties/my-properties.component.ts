import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Property } from 'src/app/app.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuctionService } from 'src/app/api/auction.service';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss']
})
export class MyPropertiesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'title', 'published', 'views', 'actions' ];
  dataSource: MatTableDataSource<Property>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  auction_array: any;

  constructor(public appService:AppService, private auctionService: AuctionService) { }

  ngOnInit() {
    this.appService.getProperties().subscribe(res => {
      this.initDataSource(res);

      this.auction_array = [];
      this.getMisSubastas();

    });
  }

  getMisSubastas(){
    let params = {
      search:"",
      auction_status_id:"",
      auction_type_id:"",
      active_category_id:"",
      order:"end_date__desc"
    }
    this.auctionService.auctionListLogged(params , localStorage.getItem("userLoggedToken") , false , true)
    .subscribe(
      (response) => {
        this.auction_array = response.response
      },
      (error) => {

      }
    )
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource<Property>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public remove(property:Property) {
    const index: number = this.dataSource.data.indexOf(property);
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE') ?? '';
      let dialogRef = this.appService.openConfirmDialog('', message);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){
          this.dataSource.data.splice(index,1);
          this.initDataSource(this.dataSource.data);
				}
			});
    }
  }

  public applyFilter(ev: EventTarget) {
    let filterValue = (ev as HTMLInputElement).value;
    this.dataSource.filter = filterValue?.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
