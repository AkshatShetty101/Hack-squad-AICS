import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  // User related requests
  verifyUser(request: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/users/login', body);
  }

  ocr(request: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/ocr', body);
  }

  deleteUser(request: any, token) {
    const body = request;
    return this.http.post(environment.serverUrl + '/users/delete', body);
  }

  // Template related requests - can pass metadata in all requests
  addTemplates(request: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/templates/add', body);
  }// body - format, title, tags

  editTemplates(request: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/templates/edit', body);
  }// body - format, title, tags

  deleteTemplates(request: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/templates/delete', body);
  }// body - templateId

  submitTemplates(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/templates/submit', body);
  }// body - templateId

  approveTemplates(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/templates/approve', body);
  }// body - templateId

  rejectAndImproveTemplates(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/templates/rejectAndImprove', body);
  }// body - templateId

  rejectAndDeleteTemplates(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/templates/rejectAndDelete', body);
  }// body - templateId

  // Form based requests - can send metadata in all requests
  editForm(request: any, files: any[], token) {
    const body = request;
    return this.http.post(environment.serverUrl + '/forms/edit', body);
  }// body - formId, data; files

  deleteForm(request: any, token) {
    const body = request;
    return this.http.post(environment.serverUrl + '/forms/delete', body);
  }// body - formId

  assignFormUser(request: any, token) {
    const body = request;
    return this.http.post(environment.serverUrl + '/forms/assignUser', body);
  }// body - formId, assigneeId, deadline

  assignGC(request: any, token) {
    const body = request;
    return this.http.post(environment.serverUrl + '/forms/assignGC', body);
  }// body - formId, assigneeId, deadline

  forfeitForm(request: any, token) {
    const body = request;
    return this.http.post(environment.serverUrl + '/forms/forfeit', body);
  }// body - formId

  submitFormToGC(request: any, token) {
    const body = request;
    return this.http.post(environment.serverUrl + '/forms/submitToGC', body);
  }// body - formId

  approveFormByGC(request: any, token) {
    const body = request
    return this.http.post(environment.serverUrl + '/forms/approveGC', body);
  }// body - formId

  approveFormByAdmin(request: any, token) {
    const body = request;
    return this.http.post(environment.serverUrl + '/forms/approveAdmin', body);
  }// body - formId

  // Requesting Authority requests
  addReqAuth(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/reqAuth/add', body);
  }// body - email, password

  removeReqAuth(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/reqAuth/remove', body);
  }// body - ra_id

  makeRequestReqAuth(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/reqAuth/makeRequest', body);
  }// body - data

  // division, group, organization requests
  addDivisionUser(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/division/add', body);
  }// body - name, type

  addIssueComment(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/issueTracker/update', body);
  }// body - name, type
  addIssue(request: any, token: any) {
    const body = request;
    return this.http.post(environment.serverUrl + '/issueTracker/add', body);
  }// body - name, type


}
