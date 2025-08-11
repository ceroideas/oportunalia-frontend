import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { SearchProperties } from '../pages/home/interfaces/search-properties';

@Injectable({
  providedIn: 'root'
})
export class UactionsService {  

  private apiKey = 'AIzaSyDsj-gbtqTAsxtWNbcqrRmE8ExatChS_Ko';
  private apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  public parameters = {min:null,max:null,type:null,category:null,search:null};

  private uActionsFilter1: string = '/auction?auction_status_id=0&auction_type_id=0&active_category_id=0&order=end_date__asc';
  private uActionsFilter7: string = '/auction?auction_status_id=0&auction_type_id=0&active_category_id=0&order=end_date__asc';
  private status1Path:  string = '/auction?auction_status_id=1&featured=1&order=end_date__asc';
  private status7Path: string = '/auction?auction_status_id=7&featured=1&order=end_date__asc';
  private readonly apiURL: string = GlobalConstants.apiURL;

  constructor(private _http: HttpClient) { }

  searchFilter(): Observable<any> {

    console.log('aqui')

    let urls = [];
    if (this.uActionsFilter1) { urls.push(this._http.get(this.apiURL + this.uActionsFilter1)); }
    if (this.uActionsFilter7) { urls.push(this._http.get(this.apiURL + this.uActionsFilter7)); }
    if (this.status1Path) { urls.push(this._http.get(this.apiURL + this.status1Path)); }
    if (this.status7Path) { urls.push(this._http.get(this.apiURL + this.status7Path)); }

    console.log(urls);

    return forkJoin(urls).pipe(map((values: any) => {

      let responseFiltered: any[] = [];      

      for (let i = 0; i < values.length; i++) {

        if (values[i].code === 200) {

          responseFiltered = [...responseFiltered, ...values[i].response];
        }
      }  
      return responseFiltered;

    }, catchError(error => throwError(() => error))));
  }

  buildURL({ min, max, type, category, search }: SearchProperties): void {

    console.log(min,max,type);

    this.parameters.min = min;
    this.parameters.max = max;
    this.parameters.type = type;
    this.parameters.category = category;
    this.parameters.search = search;

    this.status1Path = null;
    this.status7Path = null;
    this.uActionsFilter1 = `/auction?auction_status_id=1&auction_type_id=${ type }&active_category_id=${ category?.id ?? 0 }&search=${ search?.name ?? '' }&min=${ min ?? '' }&max=${ max ?? '' }&order=end_date__asc`;
    this.uActionsFilter7 = `/auction?auction_status_id=7&auction_type_id=${ type }&active_category_id=${ category?.id ?? 0 }&search=${ search?.name ?? '' }&min=${ min ?? '' }&max=${ max ?? '' }&order=end_date__asc`;    
  }

  getCoordinates(address: string): Observable<any> {
    const url = `${this.apiUrl}?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this._http.get(url);
  }
}