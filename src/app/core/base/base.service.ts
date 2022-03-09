/* eslint-disable @typescript-eslint/semi */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {


  constructor(private http: HttpClient) { }

  getData<T>(controller: String, action: string = ""): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${controller}/${action}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }


  getDataByParam<T>(param: any, controller: String, action: string = "") {
    return this.http.get<T>(`${environment.apiUrl}/${controller}/${action}`, {
      params: param
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }


  postJsonData<T>(data: any, controller: String, action: string = "") {
    const headers = { 'Content-Type': 'application/json' }
    return this.http.post<T>(`${environment.apiUrl}/${controller}/${action}`, JSON.stringify(data), { headers })

  }

  putJsonData<T>(id: any, data: any, controller: String): Observable<T>;
  putJsonData<T>(id: any, data: any, controller: String, action: string): Observable<T>;
  putJsonData<T>(id: any, data: any, controller: String, action?: string) {
    const headers = { 'Content-Type': 'application/json' }
    let url = "";
    if (action)
      url = `${environment.apiUrl}/${controller}/${action}/${id}`;
    else
      url = `${environment.apiUrl}/${controller}/${id}`;


    return this.http.put<T>(url, JSON.stringify(data), { headers })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  putJson<T>(data: any, controller: String): Observable<T>;
  putJson<T>(data: any, controller: String, action: string): Observable<T>;
  putJson<T>(data: any, controller: String, action?: string) {
    const headers = { 'Content-Type': 'application/json' }
    let url = "";
    if (action)
      url = `${environment.apiUrl}/${controller}/${action}`;
    else
      url = `${environment.apiUrl}/${controller}`;

    return this.http.put<T>(url, JSON.stringify(data), { headers })
      .pipe(
        catchError(this.handleError.bind(this))
      );

  }

  deleteData<T>(id: any, controller: String, action: string = "") {
    const headers = { 'Content-Type': 'application/json' }

    return this.http.delete<T>(`${environment.apiUrl}/${controller}/${action}?id=${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }







  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      let errorMessage: string = "Oops! Server is not reachable";
      if (error.status === 401)
        errorMessage = "Oops! Unthorized access";
      else if (error.status !== 0)
        errorMessage = `Oops! Server not responding, Error Code: ${error.status} `

      /// Can report message to UI here by Toast or Snackbar

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error?.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
