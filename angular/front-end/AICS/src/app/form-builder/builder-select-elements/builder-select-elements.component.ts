import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuildService } from '../form-build.service';

@Component({
  selector: 'ngsf-builder-select-elements',
  templateUrl: './builder-select-elements.component.html',
  styleUrls: ['./builder-select-elements.component.css']
})
export class BuilderSelectElementsComponent implements OnInit {
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
  @Input() draggableFlag;

  valueField: FormControl = new FormControl();
  myForm: FormGroup = new FormGroup({
    required: new FormControl(),
    addValue: new FormControl(),
    addLabel: new FormControl()
  });
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
  replaceOption(form) {
    // console.log(form);
    if (form.controls.addLabel.value === undefined || form.controls.addLabel.value === null
      || form.controls.addValue.value === undefined || form.controls.addValue.value === null) {
      return;
    }
    let data = form.value;
    if (!form.controls.addLabel.pristine && !form.controls.addValue.pristine) {
      this.options[this.options.length - 1] =
        {
          'label': data.addLabel,
          'options': data.addValue
        };
    }
    form.controls.addLabel.reset();
    form.controls.addValue.reset();
  }
  addOption(form) {
    // console.log(form);
    if (form.controls.addLabel.value === undefined || form.controls.addLabel.value === null
      || form.controls.addValue.value === undefined || form.controls.addValue.value === null) {
      return;
    }
    let data = form.value;
    if (!form.controls.addLabel.pristine && !form.controls.addValue.pristine) {
      this.options.push(
        {
          'label': data.addLabel,
          'value': data.addValue
        });
    }
    form.controls.addLabel.reset();
    form.controls.addValue.reset();
  }
  updateValues(form){
    // console.log(form);
    let data = form.value;
    if(!form.controls.required.pristine){
      this.required = data.required;
    }
    form.controls.addLabel.reset();
    form.controls.addValue.reset();
    let element = this.getElement();
    this.update.emit(element);
  }
  sendElement() {
    console.log(this.valueField);
    this.touched = this.valueField.touched;
    this.pristine = this.valueField.pristine;
    this.valid =  this.valueField.valid;
    const element = this.getElement();
    this.formBuild.updateForm(element, this.pos);
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
  updateFieldValue(index) {
    // console.log(index);
    this.value = this.options[index].value;
  }
  deleteElement() {
    this.delete.emit(this.pos);
  }

}
