import { Injectable } from '@angular/core';

import { HttpClient,HttpErrorResponse, HttpHeaders, HttpParams  } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private api_url = 'https://gorest.co.in/public/v2/usersss';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.api_url);
  }

  // handle error function
  private handleError(error: HttpErrorResponse) {
    let errorMessage  = '';

    if (error.error instanceof ErrorEvent) {
      // A client-side error handling.
      errorMessage = error.error.message
    } else {
      // A server-side error handling.
      errorMessage = `Backend returned code ${error.status}`
    }


    return throwError(errorMessage);
  }

}
