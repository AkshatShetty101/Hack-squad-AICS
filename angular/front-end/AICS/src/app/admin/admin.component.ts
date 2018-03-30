import { SSEService } from './../shared/services/sse.service';
import { Subject } from 'rxjs/Subject';
import { IndexDBService } from './../shared/services/indexdb.service';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

declare var EventSource: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private sse: SSEService,
    private idb: IndexDBService
  ) {
    const sse$ = this.sse.establishSSE();
    sse$.onmessage = (event) => {
      console.log('sse');
      this.idb.addNotif(JSON.parse(event.data)).then(() => {
        console.log('success!');
      }).catch((error) => {
        console.log(error);
      });
      this.sse.emitNotif(event);
    };
  }

  ngOnInit() { }

}
