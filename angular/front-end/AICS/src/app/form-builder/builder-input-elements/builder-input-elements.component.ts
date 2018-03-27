import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuildService } from '../form-build.service';

@Component({
  selector: 'ngsf-builder-input-elements',
  templateUrl: './builder-input-elements.component.html',
  styleUrls: ['./builder-input-elements.component.css']
})
export class BuilderInputElementsComponent implements OnInit {
  @Output()
  delete = new EventEmitter<number>();
  @Output()
  update = new EventEmitter<any>();
  @Input() eclass;
  @Input() subtype;
  @Input() label;
  @Input() placeholder;
  @Input() value;
  @Input() maxlength;
  @Input() max;
  @Input() min;
  @Input() required;
  @Input() touched;
  @Input() pristine;
  @Input() valid;
  @Input() pos;
  @Input() draggableFlag;

  myForm: FormGroup = new FormGroup({
    required: new FormControl(),
    label: new FormControl(),
    placeholder: new FormControl(),
    maxlength: new FormControl(),
    max: new FormControl(),
    min: new FormControl()
  });
  valueField: FormControl = new FormControl();
  constructor(
    private formBuild: FormBuildService
  ) { }

  ngOnInit() {
    this.formBuild.formSubject.subscribe(
      (event) => {
        this.sendElement();
      }
    );
  }
  updateValues(form) {
    // console.log(form);
    let data = form.value;
    if (!form.controls.label.pristine) {
      this.label = data.label;
    }
    if (!form.controls.required.pristine) {
      this.required = data.required;
    }
    if (!form.controls.placeholder.pristine) {
      this.placeholder = data.placeholder;
    }
    if (!form.controls.maxlength.pristine) {
      this.maxlength = data.maxlength;
    }
    if (!form.controls.max.pristine) {
      this.max = data.max;
    }
    if (!form.controls.min.pristine) {
      this.min = data.min;
    }
    this.value = this.valueField.value;
    form.controls.label.reset();
    form.controls.placeholder.reset();
    let element = this.getElement();
    this.update.emit(element);
  }
  sendElement() {
    this.touched = this.valueField.touched;
    this.pristine = this.valueField.pristine;
    this.valid = this.valueField.valid;
    if (this.subtype === 'text') {
      if (this.valueField.value === null || this.valueField.value === ''
        || this.valueField.value.length > this.maxlength) {
        this.valid = 'false';
      }
    } else
    if (this.subtype === 'number') {
      if (this.valueField.value === null || this.valueField.value === '' ||
        this.valueField.value > this.max || this.valueField.value < this.min) {
        this.valid = 'false';
      }
    } else
    if (this.subtype === 'date') {
      if (this.valueField.value === null || this.valueField.value === '') {
        this.valid = 'false';
      }
    } else {
      if (this.valueField.value === null) {
        this.valid = 'false';
      }
    }
    const element = this.getElement();
    this.formBuild.updateForm(element, this.pos);
  }
  getElement() {
    let element: {};
    return element = {
      'type': 'input',
      'subtype': this.subtype,
      'class': this.eclass,
      'label': this.label,
      'placeholder': this.placeholder,
      'maxlength': this.maxlength,
      'max': this.max,
      'min': this.min,
      'required': this.required,
      'value': this.valueField.value,
      'valid': this.valid,
      'touched': this.touched,
      'pristine': this.pristine
    };
  }
  deleteElement() {
    this.delete.emit(this.pos);
  }
}
