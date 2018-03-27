import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormRenderService } from '../form-render.service';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-renderer-group-elements',
  templateUrl: './renderer-group-elements.component.html',
  styleUrls: ['./renderer-group-elements.component.css']
})
export class RendererGroupElementsComponent implements OnInit {
  @Input() eclass;
  @Input() subtype;
  @Input() value;
  @Input() options;
  @Input() required;
  @Input() touched;
  @Input() pristine;
  @Input() valid;
  @Input() pos;
  disabled: boolean;
  valueField: FormControl = new FormControl();
  constructor(
    private formRender: FormRenderService
  ) { }

  ngOnInit() {
    this.formRender.formSubject.subscribe(
    (event) => {
      this.sendElement();
    }
    );
    this.disabled = this.formRender.disabled;
  }
  sendElement() {
    // console.log(this.valueField);
    this.touched = this.valueField.touched;
    this.pristine = this.valueField.pristine;
    this.valid =  this.valueField.valid;
    const element = this.getElement();
    this.formRender.updateForm(element, this.pos);
  }
  updateFieldValue(subtype, index) {
    // console.log(index);
    if (subtype === 'radio') {
      this.value = this.options[index].value;
    }else
    if(this.value.indexOf(this.options[index].value) === -1){
        this.value.push(this.options[index].value);
    }
    else{
      this.value.splice(this.value.indexOf(this.options[index]), 1);
    }
  }
  getElement() {
    let element: {};
    return element = {
      'type': 'group',
      'subtype': this.subtype,
      'class': this.eclass,
      'required': this.required,
      'value': this.value,
      'options': this.options,
      'valid': this.valid,
      'touched': this.touched,
      'pristine': this.pristine
    };
  }
}
