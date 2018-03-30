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
    console.log(request + '~' + request.url.split(':')[1] !== '3000/api/users/login');
    if (request.url.split(':')[1] !== '3000/api/users/login') {
      const mutatedRequest = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
          // .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWFiMGNkMjFlZWRlNGYzMDUwOTA0OTRiIiwiaWF0IjoxNTIyMzk0OTI3LCJleHAiOjE1NjIwNjc4Njh9.qbZFeun4SPFfaRnkbLPpHTxvbUVHTGcWV0PsPy3LtZw'),
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWFiNGRiMzU2NDM3MzYwMjQwMWJlOGU3IiwiaWF0IjoxNTIyNDQ0MDg5LCJleHAiOjE1OTkzNTQ1NzB9.7RRtHNe17E3v85TFUnezDz1vy0NMtaXEOKHbiy58K54'),
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
    }
  }

}
