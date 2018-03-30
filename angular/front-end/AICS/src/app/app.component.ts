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
  ) {
  }
  ngOnInit() {
    // this.auth.checkStatus();
  }
}
