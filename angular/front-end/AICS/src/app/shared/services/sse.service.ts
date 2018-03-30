import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class SSEService {
  public notifs = new Subject();
  constructor() { }

  emitNotif(data: any) {
    this.notifs.next(data);
  }

  getNotif() {
    return this.notifs.asObservable();
  }
}
