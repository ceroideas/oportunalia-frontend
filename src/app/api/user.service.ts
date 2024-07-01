import { Injectable } from '@angular/core';
import{ GlobalConstants } from '../global-constants';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
/* import 'rxjs/add/operator/map'; */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



userRegister( user: any ): Observable<any> {
    return this.http.post(GlobalConstants.apiURL+"/auth/register", user)
      .pipe(
        catchError((error) => {
          //return throwError(err);
          return throwError(() => error);
        })
      )
  }

  /* userRegister2(user:any): Observable<any> {
    return this.http.post(GlobalConstants.apiURL+"/auth/register", { user }).pipe(
      map(_ => true),
      catchError(error => of(false))
    );
  } */
}
