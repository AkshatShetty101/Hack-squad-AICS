import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-builder-header-elements',
  templateUrl: './builder-header-elements.component.html',
  styleUrls: ['./builder-header-elements.component.css']
})
export class BuilderHeaderElementsComponent implements OnInit {
  @Output()
  delete = new EventEmitter<number>();
  @Output()
  update = new EventEmitter<any>();
  @Input() label;
  @Input() subtype;
  @Input() eclass;
  @Input() pos;
  @Input() draggableFlag;
  myForm: FormGroup = new FormGroup({
    label: new FormControl(),
    subtype: new FormControl()
  });
  hiddenForm: boolean = false;
  constructor() { }

  ngOnInit() {
    // console.log(this.pos);
  }
  updateValues(form){
    // console.log(form.value);
    let data = form.value;
    if (!form.controls.label.pristine) {
      this.label = data.label;
    }
    if (!form.controls.subtype.pristine) {
      this.subtype = data.subtype;
    }
    form.controls.label.reset();
    let element = this.getElement();
    console.log(element);
    this.update.emit(element);
    this.hiddenForm = false;
  }
  getElement() {
    let element: {};
    return element = {
      'type': 'header',
      'subtype': this.subtype,
      'class': this.eclass,
      'label': this.label,
    };
  }
  deleteElement() {
    // console.log('Delete Header', this.pos);
    this.delete.emit(this.pos);
  }
}
