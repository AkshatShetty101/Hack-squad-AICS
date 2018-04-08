import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuildService } from '../form-build.service';

@Component({
  selector: 'app-builder-textarea-elements',
  templateUrl: './builder-textarea-elements.component.html',
  styleUrls: ['./builder-textarea-elements.component.css']
})
export class BuilderTextareaElementsComponent implements OnInit {
  @Output()
  delete = new EventEmitter<number>();
  @Output()
  update = new EventEmitter<any>();
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
  @Input() pos;
  @Input() draggableFlag;

  myForm: FormGroup = new FormGroup({
    required: new FormControl(),
    label: new FormControl(),
    placeholder: new FormControl(),
    rows: new FormControl(),
    cols: new FormControl()
  });
  hiddenForm: boolean = false;
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
  updateValues(form){
    let data = form.value;
    if( !form.controls.required.pristine){
      this.required = data.required;
    }
    if( !form.controls.label.pristine){
      this.label = data.label;
    }
    if( !form.controls.placeholder.pristine){
      this.placeholder = data.placeholder;
    }
    if( !form.controls.rows.pristine){
      this.rows = data.rows;
    }
    if( !form.controls.cols.pristine){
      this.cols = data.cols;
    }
    this.value = this.valueField.value;
    form.controls.label.reset();
    form.controls.placeholder.reset();
    let element = this.getElement();
    this.update.emit({'element': element, 'pos': this.pos});
    this.hiddenForm = false;
  }
  sendElement() {
    this.touched = this.valueField.touched;
    this.pristine = this.valueField.pristine;
    this.valid = this.valueField.valid;
    const element = this.getElement();
    this.formBuild.updateForm(element, this.pos);
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
  deleteElement() {
    this.delete.emit(this.pos);
  }
}
