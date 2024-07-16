import { Injectable } from '@angular/core';
import{ GlobalConstants } from '../global-constants';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }



  auctionListLogged( params: any , token: any , favorites: any , interacted: any ): Observable<any> {
    let url = GlobalConstants.apiURL+"/auction?";
    if(params.search!=""){ url+="search="+params.search+"&"; }
    if(params.auction_status_id!=""){ url+="auction_status_id="+params.auction_status_id+"&"; }
    if(params.auction_type_id!=""){ url+="auction_type_id="+params.auction_type_id+"&"; }
    if(params.active_category_id!=""){ url+="active_category_id="+params.active_category_id+"&"; }
    if(params.featured!=""){ url+="featured="+params.featured+"&"; }
    url+="order="+params.order+"&";
    if(favorites==true){
      url+="favorites=1"
    }
    if(interacted==true){
      url+="interacted=1"
    }
    const headerDict = {
      'Authorization': token,
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get(url,requestOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

}
