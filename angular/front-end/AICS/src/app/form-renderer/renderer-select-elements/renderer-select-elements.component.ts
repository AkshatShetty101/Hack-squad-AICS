import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormRenderService } from '../form-render.service';

@Component({
  selector: 'app-renderer-select-elements',
  templateUrl: './renderer-select-elements.component.html',
  styleUrls: ['./renderer-select-elements.component.css']
})
export class RendererSelectElementsComponent implements OnInit {
  @Output()
  delete = new EventEmitter<number>();
  @Output()
  update = new EventEmitter<any>();
  @Input() eclass;
  @Input() subtype;
  @Input() value;
  @Input() options;
  @Input() required;
  @Input() touched;
  @Input() pristine;
  @Input() valid;
  @Input() pos;

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
  }
  changeSelected(){
    let i: number;
    for(i=0; i<this.options.length; i++){
      this.options[i].selected = this.options[i].value == this.value;
    }
    console.log(this.options);
  }
  sendElement() {
    this.value = this.valueField.value;
    this.changeSelected();
    this.touched = this.valueField.touched;
    this.pristine = this.valueField.pristine;
    this.valid =  this.valueField.valid;
    const element = this.getElement();
    this.formRender.updateForm(element, this.pos);
    console.log(this.value);
    // console.log(this.options[0].value === this.value);
  }
  getElement() {
    let element: {};
    return element = {
      'type': 'select',
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
