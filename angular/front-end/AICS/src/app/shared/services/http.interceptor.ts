import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import { Observable } from 'rxjs/Rx'
import { AuthService } from './auth.service';


@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request + '~' + request.url.split(':')[1] !== '3000/api/users/login');
    if (request.url.split(':')[1] !== '3000/api/users/login') {
      const mutatedRequest = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
          // .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWFiMGNkMjFlZWRlNGYzMDUwOTA0OTRiIiwiaWF0IjoxNTIxOTY0ODAzLCJleHAiOjE1NTk3NjE2NTR9.Z3ergzAYjoMsKkTx8VPBbaF673HAP3ZW4ahQCT8P2wI'),
          // .set('x-access-token', this.auth.get)
      });
      return next.handle(mutatedRequest);
      // .do((event: HttpEvent<any>) => {
      //   if (event instanceof HttpResponse) {
      //     console.log('do in');
      //     console.log(event);
      //   }
      // }, (err: any) => {
      //   if (err instanceof HttpErrorResponse) {
      //     console.log('catch in');
      //     // if (err.status === 401) {
      //       // redirect to the login route
      //       // or show a modal
      //     // }
      //   }
      // });
    }
  }

}
