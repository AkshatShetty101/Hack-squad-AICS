import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../shared/services/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpService
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
      username: data.username,
      password: data.password
    };
    console.log(request);
    this.myForm.reset();
    this.http.verifyUser(request)
      .subscribe(
      (result) => {
        console.log(result);
      });
  }

}
