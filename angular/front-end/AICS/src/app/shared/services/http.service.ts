import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(
    private http: Http
  ) { }
  verifyUser(request: any) {
    const body = request;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/login', body, {headers})
      .map((response: Response) => response.json());
  }
}
