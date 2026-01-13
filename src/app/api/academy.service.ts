import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem('academy_token') || sessionStorage.getItem('academy_token');
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    // Debug: verificar que el token se está obteniendo
    if (token) {
      console.log('Token obtenido para headers, longitud:', token.length);
    } else {
      console.warn('No se encontró token en localStorage o sessionStorage');
    }
    return new HttpHeaders({
      'Authorization': token || '',
      'Content-Type': 'application/json'
    });
  }

  /**
   * Obtener listado de cursos públicos
   * Si el usuario está autenticado, envía el token para obtener información de acceso
   */
  getCourses(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    
    const token = this.getToken();
    const headers = token ? this.getHeaders() : new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.get(GlobalConstants.apiURL + '/academy/courses', { params: httpParams, headers })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtener detalle de un curso
   * Si el usuario está autenticado, envía el token para obtener información de acceso
   */
  getCourse(id: number): Observable<any> {
    const token = this.getToken();
    const headers = token ? this.getHeaders() : new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.get(GlobalConstants.apiURL + '/academy/course/' + id, { headers })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtener tags disponibles
   */
  getTags(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + '/academy/tags')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Registrar estudiante de academia
   */
  register(data: any): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + '/auth/academy/register', data)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Login de estudiante de academia
   */
  login(data: any): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + '/auth/academy/login', data)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Logout de estudiante de academia
   */
  logout(): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + '/auth/academy/logout', {}, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtener perfil del estudiante autenticado
   */
  getProfile(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + '/auth/academy/profile', { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtener mis cursos (requiere autenticación)
   */
  getMyCourses(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + '/academy/my-courses', { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Registrar visualización de un curso (requiere autenticación)
   */
  recordView(courseId: number, progress: number, position: number): Observable<any> {
    return this.http.post(
      GlobalConstants.apiURL + '/academy/course/' + courseId + '/view',
      { progress_percentage: progress, last_position: position },
      { headers: this.getHeaders() }
    )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtener progreso de un curso (requiere autenticación)
   */
  getCourseProgress(courseId: number): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + '/academy/course/' + courseId + '/progress', { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Verificar si el usuario está autenticado como estudiante
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Simular pago (solo para testing)
   */
  simulatePayment(courseId: number): Observable<any> {
    return this.http.post(
      GlobalConstants.apiURL + '/academy/course/' + courseId + '/simulate-payment',
      {},
      { headers: this.getHeaders() }
    )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Agregar curso a Mis Cursos (para cursos gratis principalmente)
   */
  addToMyCourses(courseId: number): Observable<any> {
    return this.http.post(
      GlobalConstants.apiURL + '/academy/course/' + courseId + '/add-to-my-courses',
      {},
      { headers: this.getHeaders() }
    )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Limpiar token de autenticación
   */
  clearToken(): void {
    localStorage.removeItem('academy_token');
    sessionStorage.removeItem('academy_token');
  }

  /**
   * Crear PaymentIntent en Stripe (requiere autenticación)
   */
  createPaymentIntent(courseId: number): Observable<any> {
    return this.http.post(
      GlobalConstants.apiURL + '/academy/course/' + courseId + '/create-payment-intent',
      {},
      { headers: this.getHeaders() }
    )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Confirmar pago en el backend (requiere autenticación)
   */
  confirmPayment(courseId: number, paymentIntentId: string): Observable<any> {
    return this.http.post(
      GlobalConstants.apiURL + '/academy/course/' + courseId + '/confirm-payment',
      { payment_intent_id: paymentIntentId },
      { headers: this.getHeaders() }
    )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}

