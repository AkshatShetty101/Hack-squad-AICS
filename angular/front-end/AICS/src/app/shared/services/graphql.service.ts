import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class GraphQLService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  profileDetails() {
    const body = { query: '{ userOne {name { firstName middleName lastName } designation } }' };
    this.http.post(environment.serverUrl + '/users', body);
  }

  loadIssueDetails(id: string) {
    const body = {
      query: "{ issueTrackerById (_id:\"" + id + "\"){ heading {title,subtitle,description},created_by,is_open,tags,data {by,message,timestamp}}}"
    };
    console.log(body);
    console.log('finding data!!!');
    return this.http.post(environment.serverUrl + '/issueTracker', body);
  }

  loadDbRequestList() {
    const body = {
      query: '{ reqFormMany { _id data } }'
    };
    return this.http.post(environment.serverUrl + '/reqForm', body);
  }
  
  loadRequestedFormData() {
    const body = {
      query: '{ reqFormOwn { _id data } }'
    };
    return this.http.post(environment.serverUrl + '/reqForm', body);
  }

  loadTemplateIdFromRequestId(id) {
    const body = {
      query: "{  reqFormById (_id:\"" + id + "\"){ template{ template_id} } }"
    };
    return this.http.post(environment.serverUrl + '/reqForm', body);
  }


}
