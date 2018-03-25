import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logged: boolean;
  constructor(
    private auth: AuthService,
    private router: Router
  ){
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
  ngOnInit(){
    this.auth.checkStatus();
  }
}
