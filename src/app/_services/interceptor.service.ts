import { Injectable, ViewContainerRef } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor(public auth: AuthService,) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("[Interceptor]: Token injecting done");
    request = request.clone({headers: request.headers.set('x-access-token', this.auth.getToken())});
    return next.handle(request);
  }

}