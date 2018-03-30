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
    private idb: IndexDBService
  ) { }

  ngOnInit() {
    const sse$ = new EventSource(this.auth.baseURI + '/notification' +
    '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWFiMGNkMjFlZWRlNGYzMDUwOTA0OTRiIiwiaWF0IjoxNTIyMzk0OTI3LCJleHAiOjE1NjIwNjc4Njh9.qbZFeun4SPFfaRnkbLPpHTxvbUVHTGcWV0PsPy3LtZw');
  sse$.onmessage = (event) => {
    console.log(JSON.parse(event.data));
    // this.idb.openConnection().then(()=>{
      this.idb.addNotif(JSON.parse(event.data)).then(() => {
        console.log('success!');
      }).catch((error) => {
        console.log(error);
      });
    // });
  };
  }

}
