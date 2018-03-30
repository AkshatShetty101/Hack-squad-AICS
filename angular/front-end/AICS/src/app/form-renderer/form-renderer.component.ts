import { Component, OnInit, Input } from '@angular/core';
import { FormRenderService } from './form-render.service';
import { Subject } from 'rxjs/Subject';
import { HttpService } from '../shared/services/http.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent implements OnInit {
  elements: any[] = [];
  constructor(
    private formRender: FormRenderService,
    private http: HttpService,
    private auth: AuthService
  ) { }
  ngOnInit() {
    this.elements = this.formRender.elements;
  }
  saveForm(){
    setTimeout(this.formRender.getForm(), 200);
    const form: any = this.formRender.elements;
    console.log(form);
    this.elements = form;
    const request = {
      body: form
    };
    this.http.editTemplates(request, this.auth.getToken())
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }
}
