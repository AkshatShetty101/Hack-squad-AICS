import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GraphQLService {
  public baseURI = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  profileDetails() {
    const body = { query: '{ userOne {name { firstName middleName lastName } designation } }' };
    this.http.post(this.baseURI + '/users', body)
      .subscribe();
  }

  loadIssueDetails(id: string) {
    const body = {
      query: "{ issueTrackerById (_id:\""+id+"\"){ heading {title,subtitle,description},created_by,is_open,tags,data {by,message,timestamp}}}"};
    console.log(body);
    console.log('finding data!!!');
    return this.http.post(this.baseURI + '/issueTracker', body);
  
  }
}
