import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  public baseURI = 'http://aics.in:3000/api';

  constructor(
  ) { }

  storeStatus(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('logged', 'true');
    localStorage.setItem('role', role);
  }

  getToken() {
   return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('token');
  }

  getStatus() {
    return localStorage.getItem('logged') === 'true';
  }

  empty() {
    localStorage.clear();
  }
}
