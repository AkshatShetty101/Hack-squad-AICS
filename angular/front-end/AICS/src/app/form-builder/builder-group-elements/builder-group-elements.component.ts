import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuildService } from '../form-build.service';

@Component({
  selector: 'app-builder-group-elements',
  templateUrl: './builder-group-elements.component.html',
  styleUrls: ['./builder-group-elements.component.css']
})
export class BuilderGroupElementsComponent implements OnInit {
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

  hiddenForm: boolean  = false;
  myForm: FormGroup = new FormGroup({
    required: new FormControl(),
    addValue: new FormControl(),
    addLabel: new FormControl(),
    removeOption: new FormControl()
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
    // console.log(this.subtype);
  }
  deleteOption(form){
    this.options.splice(form.controls.removeOption.value-1, 1);
  }
  replaceOption(form){
    // console.log(form);
    if(form.controls.addLabel.value === undefined || form.controls.addLabel.value === null
        || form.controls.addValue.value === undefined || form.controls.addValue.value === null){
      return;
    }
    let data = form.value;
    if(!form.controls.addLabel.pristine && !form.controls.addValue.pristine){
      this.options[this.options.length-1] =
        {
          'label': data.addLabel,
          'options': data.addValue
        };
    }
    form.controls.addLabel.reset();
    form.controls.addValue.reset();
  }
  addOption(form){
    // console.log(form);
    if(form.controls.addLabel.value === undefined || form.controls.addLabel.value === null
        || form.controls.addValue.value === undefined || form.controls.addValue.value === null){
      return;
    }
    let data = form.value;
    if(!form.controls.addLabel.pristine && !form.controls.addValue.pristine){
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
    // console.log(element);
    this.update.emit({'element': element, 'pos': this.pos});
    this.hiddenForm = false;
  }
  sendElement() {
    this.valid = true;
    if(this.required){
      if(this.value === '' || this.value === null || this.value === undefined || this.value.length === 0){
        this.valid = false;
      }
    }
    const element = this.getElement();
    this.formBuild.updateForm(element, this.pos);
  }
  updateFieldValue(subtype, index) {
    // console.log(index);
    this.touched = true;
    this.pristine = false;
    if (subtype === 'radio') {
      this.value = this.options[index].value;
    }else
    if(this.value.indexOf(this.options[index].value) === -1){
      this.value.push(this.options[index].value);
    }
    else{
      this.value.splice(this.value.indexOf(this.options[index].value), 1);
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
  deleteElement(){
    this.delete.emit(this.pos);
  }
}
