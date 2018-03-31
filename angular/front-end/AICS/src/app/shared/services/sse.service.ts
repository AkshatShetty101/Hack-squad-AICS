import { IndexDBService } from './indexdb.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { environment } from './../../../environments/environment';

declare var EventSource: any;

@Injectable()
export class SSEService {
  public notifs = new Subject();
  public sse$: any;

  constructor(
    private auth: AuthService,
    private idb: IndexDBService
  ) { }

  establishSSE() {
    this.sse$ = new EventSource(environment.serverUrl + '/notification?token=' + this.auth.getToken());
    this.sse$.onmessage = (event) => {
      console.log('sse');
      this.idb.addNotif(JSON.parse(event.data)).then(() => {
        console.log('success!');
      }).catch((error) => {
        console.log(error);
      });
      this.emitNotif(event);
    }
  }

  emitNotif(data: any) {
    this.notifs.next(data);
  }

  getNotif() {
    return this.notifs.asObservable();
  }
}
