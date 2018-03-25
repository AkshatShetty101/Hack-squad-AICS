import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

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
