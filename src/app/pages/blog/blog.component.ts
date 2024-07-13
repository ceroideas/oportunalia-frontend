import { Component, OnInit, ViewChild } from '@angular/core';
/* import { CommonModule } from '@angular/common'; */
import { MatPaginator } from '@angular/material/paginator';
import { MediaChange, MediaObserver } from '@ngbracket/ngx-layout';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Settings, AppSettings } from '../../app.settings';
import { AppService } from '../../app.service';
import { Post, Pagination } from '../../app.models';
import { DomHandlerService } from 'src/app/dom-handler.service';
import { PublicService } from 'src/app/api/public.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{

  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //public properties: Property[];
  public blog: Post[];
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
  constructor(public appSettings: AppSettings,
              public appService: AppService,
              public mediaObserver: MediaObserver,
              public publicService: PublicService,
              private domHandlerService: DomHandlerService,
              private sanitizer: DomSanitizer) {

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

  ngOnInit() {
    console.log("getPosts OnInit");
    this.getPosts();
  }

  ngOnDestroy(){
    this.watcher.unsubscribe();
  }

  public getPosts(){
    this.publicService.blogList().subscribe(data => {

      //let result = this.filterData(data);
      if(data.length == 0){
        //this.properties.length = 0;
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
        this.message = 'No hay resultados';
      } else {
        //this.properties = result.data;
        this.blog = data.response;
        //this.pagination = result.pagination;
        this.message = null;
      }

    })
  }

  public resetPagination(){
    if(this.paginator){
      this.paginator.pageIndex = 0;
    }
    this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
  }

  public filterData(data){
    return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
  }

  public searchClicked(){
    //this.properties.length = 0;
    //this.getProperties();
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
       // this.properties.length = 0;
      }
    });
    event.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => {
      if(!this.settings.searchOnBtnClick){
        //this.getProperties();
      }
    });
  }
  public removeSearchField(field){
    this.message = null;
    this.removedSearchField = field;
  }


  public changeCount(count){
    this.count = count;
    //this.properties.length = 0;
    this.resetPagination();
    //this.getProperties();
  }
  public changeSorting(sort){
    this.sort = sort;
    /* this.properties.length = 0;
    this.getProperties(); */
  }
  public changeViewType(obj){
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol;
  }


  public onPageChange(e){
    this.pagination.page = e.pageIndex + 1;
    //this.getProperties();
    this.domHandlerService.winScroll(0, 0);
  }

  renderHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
