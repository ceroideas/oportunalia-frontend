import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PublicService {

  constructor(private http: HttpClient) { }


  countryList(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/country")
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  provinceList( countryId:any ): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/province/"+countryId)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  categoryList(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/active_category/list")
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  blogList(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/blog")
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  blogContent(id:any): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/blog/"+id)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }


}
