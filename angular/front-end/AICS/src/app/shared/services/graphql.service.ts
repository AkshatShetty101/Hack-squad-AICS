import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GraphQLService {

  constructor(
    private http: HttpClient,
    private auth
  ) { }

  profileDetails() {
    const body = { query: '{ userOne {name { firstName middleName lastName } designation } }' };
    this.http.post(this.auth.baseURI + '/users', body);
  }

  loadIssueDetails(id: string) {
    const body = {
      query: "{ issueTrackerById (_id:\""+id+"\"){ heading {title,subtitle,description},created_by,is_open,tags,data {by,message,timestamp}}}"};
    console.log(body);
    console.log('finding data!!!');
    return this.http.post(this.auth.baseURI + '/issueTracker', body)
  }

  loadRequestedFormData() {
    const body = {
      query: '{ reqFormOwn { _id data } }'
    };
    return this.http.post(this.auth.baseURI + '/reqForm', body);
  }
}
