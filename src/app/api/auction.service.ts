import { GlobalConstants } from '../global-constants';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  auctionList( params: any , token: any ): Observable<any> {

    let url = GlobalConstants.apiURL+"/auction?";
    if(params.search!=""){ url+="search="+params.search+"&"; }
    if(params.auction_status_id!=""){ url+="auction_status_id="+params.auction_status_id+"&"; }
    if(params.auction_type_id!=""){ url+="auction_type_id="+params.auction_type_id+"&"; }
    if(params.active_category_id!=""){ url+="active_category_id="+params.active_category_id+"&"; }
    if(params.featured!=""){ url+="featured="+params.featured+"&"; }
    url+="order="+params.order;

    let headerDict
    if(token!=null){
      headerDict = {
        'Authorization': token,
      }
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    //console.log("Llamada URL: "+url);
    return this.http.get(url,requestOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  auctionListRepercution( params: any , token: any ): Observable<any> {

    let url = GlobalConstants.apiURL+"/auction?repercution="+params.repercution;

    let headerDict
    if(token!=null){
      headerDict = {
        'Authorization': token,
      }
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

  auctionListFeatured( params: any , token: any ): Observable<any> {

    let url = GlobalConstants.apiURL+"/auction?featured="+params.featured;

    let headerDict
    if(token!=null){
      headerDict = {
        'Authorization': token,
      }
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

  auctionLast( params: any , token: any ): Observable<any> {

    let url = GlobalConstants.apiURL+"/auction_last?";
    if(params.search!=""){ url+="search="+params.search+"&"; }
    if(params.auction_status_id!=""){ url+="auction_status_id="+params.auction_status_id+"&"; }
    if(params.auction_type_id!=""){ url+="auction_type_id="+params.auction_type_id+"&"; }
    if(params.active_category_id!=""){ url+="active_category_id="+params.active_category_id+"&"; }
    if(params.featured!=""){ url+="featured="+params.featured+"&"; }
    url+="order="+params.order;

    let headerDict
    if(token!=null){
      headerDict = {
        'Authorization': token,
      }
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

  auctionFinished( params: any , token: any ): Observable<any> {

    let url = GlobalConstants.apiURL+"/auction_finished?";
    if(params.search!=""){ url+="search="+params.search+"&"; }
    if(params.auction_status_id!=""){ url+="auction_status_id="+params.auction_status_id+"&"; }
    if(params.auction_type_id!=""){ url+="auction_type_id="+params.auction_type_id+"&"; }
    if(params.active_category_id!=""){ url+="active_category_id="+params.active_category_id+"&"; }
    if(params.featured!=""){ url+="featured="+params.featured+"&"; }
    url+="order="+params.order;

    let headerDict
    if(token!=null){
      headerDict = {
        'Authorization': token,
      }
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

  auctionDetail(id:any): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/auction/"+id)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  auctionDetailLogged(id:any , token:any ): Observable<any> {
    const headerDict = {
      'Authorization': token,
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(GlobalConstants.apiURL+"/auction/"+id+"/detail",requestOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  auctionCheckMembresia(id:any , token:any ): Observable<any> {
    const headerDict = {
      'Authorization': token,
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(GlobalConstants.apiURL+"/auction/"+id+"/check-membresia",requestOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  auctionFav( token: any , id:any ): Observable<any> {
    var headers = new HttpHeaders(
      {
        'Authorization': token,
      }
    );
    const params = new HttpParams({
      fromObject:{
      }
    });
    return this.http.put(GlobalConstants.apiURL+"/auction/"+id+"/favorite", params, { headers } )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  auctionPlaceBid( auctionBid:any , token:any , id:any ){
    var headers = new HttpHeaders(
      {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    );
    let params:any;
    if(auctionBid.representation_id!=0){
      params = new HttpParams({
        fromObject:
        {
          import : auctionBid.import,
          auto : auctionBid.auto,
          representation_id: auctionBid.representation_id
        }
      });
    }else{
      params = new HttpParams({
        fromObject:
        {
          import : auctionBid.import,
          auto : auctionBid.auto,
        }
      });
    }
    return this.http.post(GlobalConstants.apiURL+"/auction/"+id+"/bid", params, { headers } )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  auctionPlaceDirectOffer( directOffer: any , token: any , id: any ){
    var headers = new HttpHeaders(
      {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    );
    let params:any;
    params = new HttpParams({
      fromObject:
      {
        import : directOffer.import,
      }
    });
    return this.http.post(GlobalConstants.apiURL+"/direct_sale/"+id+"/", params, { headers } )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

}
