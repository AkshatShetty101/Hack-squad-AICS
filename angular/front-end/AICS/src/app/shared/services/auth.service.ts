import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
<<<<<<< HEAD
=======
  public baseURI = 'http://localhost:3000/api';
>>>>>>> 4e72468d04e488de4241f632991f074aa4087aef

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
