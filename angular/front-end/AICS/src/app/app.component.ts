import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { IndexDBService } from './shared/services/indexdb.service';

declare var EventSource: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logged: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private idb: IndexDBService
  ) {
    // auth.statusEmitted$.subscribe(
    //   (status) => {
    //    this.logged = status;
    //    console.log('Logged-', this.logged);
    //     if(!this.logged){
    //       this.router.navigateByUrl('/admin');
    //     }
    //     else{
    //       this.router.navigateByUrl('/admin');
    //     }
    //   }
    // );
    const sse$ = new EventSource(this.auth.baseURI + '/notifications');
    sse$.onmessage = (event) => {
      console.log(event);
    };
  }
  ngOnInit() {
    // this.auth.checkStatus();
  }
}
