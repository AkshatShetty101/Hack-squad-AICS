import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable()
export class GraphQLService {
  public baseURI = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  profileDetails() {
    const body = { query: '{ userOne {name { firstName middleName lastName } designation } }'};
    this.http.post(this.baseURI + '/users', body)
      .subscribe();
  }
}
