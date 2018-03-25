import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../shared/services/http.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private auth: AuthService,
    private router: Router
  ) {
    this.myForm = fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }
  submitCredentials(data) {
    let request: any;
    request = {
      email: data.username,
      password: data.password
    };
    // console.log(request);
    this.myForm.reset();
    this.auth.empty();
    this.http.verifyUser(request)
      .subscribe(
      (response) => {
        console.log(response);
        // if(response.status === 'LOGIN'){
        //   console.log('Here!');
        //   this.auth.storeStatus(response.token);
        //   this.auth.storeRole(response.designation);
        //   this.router.navigateByUrl('');
        // }
      },
      (error) => {
        console.log(error);
        // if(error.status === 'INVALID_CRED'){
        //   alert('Wrong username or password');
        // }
        // this.router.navigateByUrl('');
    });
  }

}
