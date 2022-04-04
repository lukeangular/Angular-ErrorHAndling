import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import * as Sentry from "@sentry/browser";

@Injectable({
  providedIn: 'root'
})
export class AppInterCeptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'Authorization' :' SundarTamang'
    });
    const clone = req.clone({
      headers: headers
    });
    
    return next.handle(clone)
    .pipe(
      retry(1),
      //This is where we ue logic
      catchError(this.handleError)
    )
  }

    // handle error function
    private handleError(error: HttpErrorResponse) {
      let errorMessage  = '';
  
      if (error.error instanceof ErrorEvent) {
        // A client-side error handling.
        errorMessage = error.error.message
        Sentry.captureException(error);

        // or we can do this 
        // return throwError(error.message);
      } else {
        // A server-side error handling.
        errorMessage = `Backend returned code ${error.status}`
        Sentry.captureException(error);

        // or we can do this 
        // return throwError(error.message);
      }
      return throwError(errorMessage);

    }

  
}
