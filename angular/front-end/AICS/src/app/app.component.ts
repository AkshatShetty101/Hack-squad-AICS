import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { IndexDBService } from './shared/services/indexdb.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logged: boolean;
  themeName = 'theme-one';

  constructor(
    private auth: AuthService,
    private router: Router,
    private idb: IndexDBService
  ) {
    this.idb.openConnection().then(()=>{
      console.log('connected!');
    }).catch((err)=>{
      console.log(err);
    });
    this.auth.themeChange.subscribe(
      (val) => {
      this.themeName = val;
    })
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
  }
  ngOnInit() {
    this.idb.openConnection().then(()=>{
      console.log('connection established!!');
    }).catch((err)=>{
      console.log(err);
    });
    // this.auth.checkStatus();
  }
}
