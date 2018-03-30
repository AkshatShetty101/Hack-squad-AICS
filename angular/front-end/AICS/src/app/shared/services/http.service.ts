import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  // User related requests
  verifyUser(request: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/users/login', body);
  }

  deleteUser(request: any, token) {
    const body = request;
    return this.http.post('http://localhost:3000/api/users/delete', body);
  }

  // Template related requests - can pass metadata in all requests
  addTemplates(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/templates/add', body);
  }// body - format, title, tags

  editTemplates(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/templates/edit', body);
  }// body - format, title, tags

  deleteTemplates(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/templates/delete', body);
  }// body - templateId

  submitTemplates(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/templates/submit', body);
  }// body - templateId

  approveTemplates(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/templates/approve', body);
  }// body - templateId

  rejectAndImproveTemplates(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/templates/rejectAndImprove', body);
  }// body - templateId

  rejectAndDeleteTemplates(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/templates/rejectAndDelete', body);
  }// body - templateId

  // Form based requests - can send metadata in all requests
  editForm(request: any, files: any[], token) {
    const body = request;
    return this.http.post('http://localhost:3000/api/forms/edit', body);
  }// body - formId, data; files

  deleteForm(request: any, token) {
    const body = request;
    return this.http.post('http://localhost:3000/api/forms/delete', body);
  }// body - formId

  assignFormUser(request: any, token) {
    const body = request;
    return this.http.post('http://localhost:3000/api/forms/assignUser', body);
  }// body - formId, assigneeId, deadline

  assignGC(request: any, token) {
    const body = request;
    return this.http.post('http://localhost:3000/api/forms/assignGC', body);
  }// body - formId, assigneeId, deadline

  forfeitForm(request: any, token) {
    const body = request;
    return this.http.post('http://localhost:3000/api/forms/forfeit', body);
  }// body - formId

  submitFormToGC(request: any, token) {
    const body = request;
    return this.http.post('http://localhost:3000/api/forms/submitToGC', body);
  }// body - formId

  approveFormByGC(request: any, token) {
    const body = request
    return this.http.post('http://localhost:3000/api/forms/approveGC', body);
  }// body - formId

  approveFormByAdmin(request: any, token) {
    const body = request;
    return this.http.post('http://localhost:3000/api/forms/approveAdmin', body);
  }// body - formId

  // Requesting Authority requests
  addReqAuth(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/reqAuth/add', body);
  }// body - email, password

  removeReqAuth(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/reqAuth/remove', body);
  }// body - ra_id

  makeRequestReqAuth(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/reqAuth/makeRequest', body);
  }// body - data

  // division, group, organization requests
  addDivisionUser(request: any, token: any) {
    const body = request;
    return this.http.post('http://localhost:3000/api/division/add', body);
  }// body - name, type
}
