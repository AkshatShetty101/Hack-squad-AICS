import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(
    private http: Http,
    private _http: HttpClient
  ) { }

  // User related requests
  verifyUser(request: any) {
    const body = request;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post('http://localhost:3000/api/users/login', body, { headers });
  }

  deleteUser(request: any, token) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/users/delete', body, { headers })
      .map((response: Response) => response.json());
  }

  // Template related requests - can pass metadata in all requests
  addTemplates(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/templates/add', body, { headers })
      .map((response: Response) => response.json());
  }// body - format, title, tags

  editTemplates(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/templates/edit', body, { headers })
      .map((response: Response) => response.json());
  }// body - format, title, tags

  deleteTemplates(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/templates/delete', body, { headers })
      .map((response: Response) => response.json());
  }// body - templateId

  submitTemplates(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/templates/submit', body, { headers })
      .map((response: Response) => response.json());
  }// body - templateId

  approveTemplates(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/templates/approve', body, { headers })
      .map((response: Response) => response.json());
  }// body - templateId

  rejectAndImproveTemplates(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/templates/rejectAndImprove', body, { headers })
      .map((response: Response) => response.json());
  }// body - templateId

  rejectAndDeleteTemplates(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/templates/rejectAndDelete', body, { headers })
      .map((response: Response) => response.json());
  }// body - templateId

  // Form based requests - can send metadata in all requests
  editForm(request: any, files: any[], token) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/forms/edit', body, { headers })
      .map((response: Response) => response.json());
  }// body - formId, data; files

  deleteForm(request: any, token) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/forms/delete', body, { headers })
      .map((response: Response) => response.json());
  }// body - formId

  assignFormUser(request: any, token) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/forms/assignUser', body, { headers })
      .map((response: Response) => response.json());
  }// body - formId, assigneeId, deadline

  assignGC(request: any, token) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/forms/assignGC', body, { headers })
      .map((response: Response) => response.json());
  }// body - formId, assigneeId, deadline

  forfeitForm(request: any, token) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/forms/forfeit', body, { headers })
      .map((response: Response) => response.json());
  }// body - formId
  submitFormToGC(request: any, token) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/forms/submitToGC', body, { headers })
      .map((response: Response) => response.json());
  }// body - formId

  approveFormByGC(request: any, token) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/forms/approveGC', body, { headers })
      .map((response: Response) => response.json());
  }// body - formId

  approveFormByAdmin(request: any, token) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/forms/approveAdmin', body, { headers })
      .map((response: Response) => response.json());
  }// body - formId

  // Requesting Authority requests
  addReqAuth(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/reqAuth/add', body, { headers })
      .map((response: Response) => response.json());
  }// body - email, password

  removeReqAuth(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/reqAuth/remove', body, { headers })
      .map((response: Response) => response.json());
  }// body - ra_id

  makeRequestReqAuth(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/reqAuth/makeRequest', body, { headers })
      .map((response: Response) => response.json());
  }// body - data

  // division, group, organization requests
  addDivisionUser(request: any, token: any) {
    const body = request;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.post('http://localhost:3000/api/division/add', body, { headers })
      .map((response: Response) => response.json());
  }// body - name, type

}
