import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormRenderService } from '../form-render.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-renderer-textarea-elements',
  templateUrl: './renderer-textarea-elements.component.html',
  styleUrls: ['./renderer-textarea-elements.component.css']
})
export class RendererTextareaElementsComponent implements OnInit {
  @Input() eclass;
  @Input() label;
  @Input() placeholder;
  @Input() value;
  @Input() rows;
  @Input() cols;
  @Input() required;
  @Input() touched;
  @Input() pristine;
  @Input() valid;
  @Input() parentSubject: Subject<boolean>;
  @Input() pos;
  @Input() draggableFlag;
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
  sendElement() {
    this.touched = this.valueField.touched;
    this.pristine = this.valueField.pristine;
    this.valid = this.valueField.valid;
    const element = this.getElement();
    this.formRender.updateForm(element, this.pos);
  }
  getElement() {
    let element: {};
    return element = {
      'type': 'textarea',
      'class': this.eclass,
      'label': this.label,
      'placeholder': this.placeholder,
      'rows': this.rows,
      'cols': this.cols,
      'required': this.required,
      'value': this.valueField.value,
      'valid': this.valid,
      'pristine': this.pristine,
      'touched': this.touched
    };
  }
}
