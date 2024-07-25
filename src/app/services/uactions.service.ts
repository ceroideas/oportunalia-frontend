import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { SearchProperties } from '../pages/home/interfaces/search-properties';

@Injectable({
  providedIn: 'root'
})
export class UactionsService {  

  private uActionsFilter1: string = '/auction?auction_status_id=0&auction_type_id=0&active_category_id=0&order=end_date__asc';
  private uActionsFilter7: string = '/auction?auction_status_id=0&auction_type_id=0&active_category_id=0&order=end_date__asc';
  private readonly status1Path:  string = '/auction?auction_status_id=1&featured=1&order=end_date__asc';
  private readonly status7Path: string = '/auction?auction_status_id=7&featured=1&order=end_date__asc';
  private readonly apiURL: string = GlobalConstants.apiURL;

  constructor(private _http: HttpClient) { }

  searchFilter(): Observable<any> {    

    return forkJoin([
      this._http.get(this.apiURL + this.status1Path),
      this._http.get(this.apiURL + this.status7Path),
      this._http.get(this.apiURL + this.uActionsFilter1),
      this._http.get(this.apiURL + this.uActionsFilter7),
    ]).pipe(map((values: any) => {

      let responseFiltered: any[] = [];      

      for (let i = 0; i < values.length; i++) {

        if (values[i].code === 200) {

          responseFiltered = [...responseFiltered, ...values[i].response];
        }
      }  
      return responseFiltered;

    }, catchError(error => throwError(() => error))));
  }

  buildURL({ type, category, search }: SearchProperties): void {       
    this.uActionsFilter1 = `/auction?auction_status_id=1&auction_type_id=${ type }&active_category_id=${ category }&search=${ search }&order=end_date__asc`;
    this.uActionsFilter7 = `/auction?auction_status_id=7&auction_type_id=${ type }&active_category_id=${ category }&search=${ search }&order=end_date__asc`;    
  }
}