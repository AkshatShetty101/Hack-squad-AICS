import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private themeName = 'theme-one';
  public themeChange = new EventEmitter<any>();

  constructor(
  ) { }

  toggleTheme() {
    if (this.themeName === 'theme-one'){
      this.themeName = 'theme-two';
      this.themeChange.emit(this.themeName);
    }
  }
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
