import { Component, OnInit, Input } from '@angular/core';
import { FormRenderService } from './form-render.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent implements OnInit {
  elements: any[] = [];
  constructor(
    private formRender: FormRenderService
  ) { }
  ngOnInit() {
    this.elements = this.formRender.elements;
  }
  saveForm(){
    setTimeout(this.formRender.getForm(), 200);
    const form: any = this.formRender.elements;
    console.log(form);
  }
}
