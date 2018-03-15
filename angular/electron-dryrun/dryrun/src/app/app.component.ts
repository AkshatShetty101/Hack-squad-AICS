import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var EventSource: any;

@Component({
  selector: 'dry-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dry';
  msgs: string[] = ['Demo of Server Sent Events'];
  msgEvent$: any;

  constructor(private ref: ChangeDetectorRef) {
    this.msgEvent$ = new EventSource('http://localhost:3000');
  }

  ngOnInit() {
    this.msgEvent$.onmessage = (x) => {
      console.log(x.data);
      this.msgs.push(x.data);
      this.ref.detectChanges();
    };
  }
}
