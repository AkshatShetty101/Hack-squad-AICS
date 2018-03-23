import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {

  private status = new Subject<boolean>();
  private role = new Subject<string>();
  statusEmitted$ = this.status.asObservable();
  roleEmitted$ = this.role.asObservable();

  constructor(
    private local: LocalStorageService
  ) {}
  storeStatus(token: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('logged', 'true');
    this.checkStatus();
  }
  storeRole(role: any){
    localStorage.setItem('role', role);
  }
  getRole(token: any) {
    return localStorage.getItem(token);
  }
  getStatus(){
    return localStorage.getItem('logged') === 'true';
  }
  checkStatus() {
    this.status.next(this.getStatus());
  }
  checkRole(){
    this.role.next(this.getRole('role'));
  }
  empty(){
    localStorage.clear();
    console.log('All clear!');
  }

}
