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
  table: any;
  open: boolean = true;
  constructor(
    private formRender: FormRenderService,
    private http: HttpService,
    private auth: AuthService
  ) { }
  ngOnInit() {
    this.table = this.formRender.table;
    console.log(this.table);
    if(this.table === null || this.table === undefined){
      this.open = false;
    }
    else{
      this.open = true;
    }
  }
  saveForm(){
    setTimeout(this.formRender.getForm(), 200);
    const form: any = this.formRender.table;
    console.log(form);
    this.table = form;
    const request = {
      body: form
    };
    this.http.editTemplates(request)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }
}
