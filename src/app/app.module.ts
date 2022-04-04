import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AppInterCeptorService} from 'src/app/app-inter-ceptor.service'

// for sentry
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from "@sentry/tracing"


Sentry.init({
  dsn: "https://5e69ba19a3b044ddb87f0094de934c41@o1188261.ingest.sentry.io/6308258",
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["localhost", "https://yourserver.io/api"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

Sentry.configureScope((scope) =>{
  scope.setUser({'email':'sundarbentray@gmail.com'})
})

@Injectable()
export class SentryErrorHandler implements ErrorHandler{
  constructor(){}

  handleError(error: any): void {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AppInterCeptorService,
      multi: true
    }, 
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
