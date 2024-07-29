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
        catchError((error) => {
          //return throwError(err);
          return throwError(() => error);
        })
      )
  }

  provinceList( countryId:any ): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/province/"+countryId)
      .pipe(
        catchError((error) => {
          //return throwError(err);
          return throwError(() => error);
        })
      )
  }

  categoryList(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/active_category/list")
      .pipe(
        catchError((error) => {
          //return throwError(err);
          return throwError(() => error);
        })
      )
  }

  blogList(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/blog")
      .pipe(
        catchError((error) => {
          //return throwError(err);
          return throwError(() => error);
        })
      )
  }

  blogContent(id:any): Observable<any> {
    return this.http.get(GlobalConstants.apiURL+"/blog/"+id)
      .pipe(
        catchError((error) => {
          //return throwError(err);
          return throwError(() => error);
        })
      )
  }

  public getRepresentations(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + "/representation_type")
      .pipe(catchError(error => throwError(() => error)));
  }

  public sendContactData(contactInfo): Observable<any>{
    return this.http.post(GlobalConstants.apiURL + "/contact", contactInfo)
      .pipe(catchError(error => throwError(() => error)));
  }

}
