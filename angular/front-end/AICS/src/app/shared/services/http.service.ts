import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(
    private http: Http
  ) { }
  verifyUser(request: any) {
    const body = request;
    let headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://aics.in:3000/api/users/login', body, {headers})
      .map((response: Response) => response.json());
  }
}
