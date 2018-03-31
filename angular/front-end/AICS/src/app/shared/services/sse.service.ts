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
    return new EventSource(environment.serverUrl + '/notification?token=' + this.auth.getToken());
  }

  emitNotif(data: any) {
    this.notifs.next(data);
  }

  getNotif() {
    return this.notifs.asObservable();
  }
}
