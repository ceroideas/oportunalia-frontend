import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Settings, AppSettings } from '../../app.settings';
import { AppService } from '../../app.service';
import { Property, Pagination } from '../../app.models';
import { DomHandlerService } from 'src/app/dom-handler.service';
import { ActivatedRoute } from '@angular/router';
import { UactionsService } from 'src/app/services/uactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public properties: Property[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 33.3;
  public count: number = 12;
  public sort: string;
  public searchFields: any;
  public removedSearchField: string | null;
  public pagination:Pagination = new Pagination(1, this.count, null, 2, 0, 0);
  public message:string | null;
  public watcher: Subscription;

  public settings: Settings
  constructor(public appSettings:AppSettings,
              public appService:AppService,
              public mediaObserver: MediaObserver,
              public route: ActivatedRoute,
              public router: Router,
              public uactions: UactionsService,
              private domHandlerService: DomHandlerService) {
    this.settings = this.appSettings.settings;
    this.watcher = mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {
      if (change.mqAlias == 'xs') {
        this.sidenavOpen = false;
        this.viewCol = 100;
      }
      else if(change.mqAlias == 'sm'){
        this.sidenavOpen = false;
        this.viewCol = 50;
      }
      else if(change.mqAlias == 'md'){
        this.viewCol = 50;
        this.sidenavOpen = true;
      }
      else{
        this.viewCol = 33.3;
        this.sidenavOpen = true;
      }
    });

  }

  filter = null;
  bgImage = 'assets/images/others/blog.png';

  ngOnInit() {
    console.log("getProperties OnInit");
    console.log(this.router.url);
    this.filter = this.router.url;

    if (this.filter == '/auction') {
      this.bgImage = 'assets/images/subasta.png';
    }
    if (this.filter == '/direct-sale') {
      this.bgImage = "assets/images/venta.png";
    }
    if (this.filter == '/auction-assignment') {
      this.bgImage = "assets/images/cesion.png";
    }


    this.getProperties();
  }

  ngOnDestroy(){
    this.watcher.unsubscribe();
  }

  public getProperties(reset: boolean = false){
    
    const search = this.route.snapshot.queryParamMap.has('search');
    const origin = search && !reset ? this.uactions.searchFilter() : this.appService.getProperties();

    origin.subscribe(data => {           
                
      data = data.map(data => data?.response ? data.response : data);
      data = [].concat(...data);

      let result = this.filterData(data);
      if(result.data.length == 0){
        this.properties.length = 0;
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
        this.message = 'No hay resultados';
      } else {
        this.properties = result.data;
        this.pagination = result.pagination;
        this.message = null;
      }
    })
  }

  public resetPagination(){

    const search = this.route.snapshot.queryParamMap.has('search');        

    if (search) {  
      this.getProperties(true);
    } else {

      if(this.paginator){
        this.paginator.pageIndex = 0;
      }
      this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
    }
  }

  public filterData(data){
    return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage, this.filter);
  }

  public searchClicked(){
    this.properties.length = 0;
    this.getProperties();
    this.domHandlerService.winScroll(0, 0);
  }
  public searchChanged(event){

    
    event.valueChanges.subscribe(() => {      
      this.resetPagination();
      this.searchFields = event.value;
      setTimeout(() => {
        this.removedSearchField = null;
      });
      if(!this.settings.searchOnBtnClick){
        this.properties.length = 0;
      }
    });
    event.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => {
      if(!this.settings.searchOnBtnClick){
        this.getProperties();
      }
    });
  }
  public removeSearchField(field){
    this.message = null;
    this.removedSearchField = field;
  }


  public changeCount(count){
    this.count = count;
    this.properties.length = 0;
    this.resetPagination();
    this.getProperties();
  }
  public changeSorting(sort){
    this.sort = sort;
    this.properties.length = 0;
    this.getProperties();
  }
  public changeViewType(obj){
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol;
  }


  public onPageChange(e){
    this.pagination.page = e.pageIndex + 1;
    this.getProperties();
    this.domHandlerService.winScroll(0, 0);
  }

}
