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

  public isLoggedIn: boolean = false;
  public authToken: string = '';
  constructor(private http: HttpClient) { }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }  

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  setAuthToken(token) {
    this.isLoggedIn = true;
    localStorage.setItem('token', token);
    this.authToken = token;
  }

  userRegister( user: any ): Observable<any> {  

    return this.http.post(GlobalConstants.apiURL+"/auth/register", user)
      .pipe(
        catchError((error) => {
          //return throwError(err);
          console.log(error);
          return throwError(() => error);
        })
      )
  }

  updateUserNotifications(user: any) {
    return this.http.put(GlobalConstants.apiURL + "/user/notifications", user, { headers: { 'Authorization': this.getToken()}, })
  }

  updateUserPassword(user: any): Observable<any> {
    return this.http.put(GlobalConstants.apiURL + "/user/change-password", user, { headers: { 'Authorization': this.getToken()}, })
  }

  updateUserData(user: any): Observable<any> {
    return this.http.put(GlobalConstants.apiURL + "/user", user, { headers: { 'Authorization': this.getToken()}, })
  }

  userReestablecer(user: any): Observable<any> {
    return this.http.post(GlobalConstants.apiURL+"/auth/recover-password", user)
  }

  getUserData(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + "/user", { headers: { 'Authorization': this.getToken()}, })
  }

  changePassword(password: string, token: string): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + `reset-password/${ token }`, { password });
  }

  login( user: any ): Observable<any> {  

    return this.http.post(GlobalConstants.apiURL+"/auth/login", user)
      .pipe(
        catchError((error) => {
          //return throwError(err);
          console.log(error);
          return throwError(() => error);
        })
      )
  }  

  verifyAccount(token: string): Observable<any> {  
    return this.http.get(GlobalConstants.apiURL + "/auth/activate/" + token)
      .pipe(
        catchError((error) => {
          //return throwError(err);
          console.log(error);
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
