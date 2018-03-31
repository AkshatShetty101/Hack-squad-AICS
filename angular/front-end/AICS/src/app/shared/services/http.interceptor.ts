import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx'
import { AuthService } from './auth.service';


@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const split = request.url.split(':');
    const ignoreURLs = ['3000/api/users/login', '3000/api/translate'];
    if (ignoreURLs.indexOf(split[split.length - 1]) === -1) {
      const mutatedRequest = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
          .set('x-access-token', this.auth.getToken()),
        // .set('x-access-token', this.auth.get)
      });
      console.log(mutatedRequest);
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
      //     // redirect to the login route
      //     // or show a modal
      //     // }
      //   }
      // });
    } else {
      console.log('Some shit happened!');
      return next.handle(request);
    }
  }

}
