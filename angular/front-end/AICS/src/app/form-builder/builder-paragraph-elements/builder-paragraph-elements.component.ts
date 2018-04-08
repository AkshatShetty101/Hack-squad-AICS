import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-builder-paragraph-elements',
  templateUrl: './builder-paragraph-elements.component.html',
  styleUrls: ['./builder-paragraph-elements.component.css']
})
export class BuilderParagraphElementsComponent implements OnInit {
  @Output()
  delete = new EventEmitter<number>();
  @Output()
  update = new EventEmitter<any>();
  @Input() content;
  @Input() eclass;
  @Input() pos;
  @Input() draggableFlag;
  hiddenForm: boolean = false;
  myForm: FormGroup = new FormGroup({
    content: new FormControl()
  });
  constructor() { }

  ngOnInit() {
    // console.log(this.pos);
  }
  updateValues(form){
    // console.log(form.value);
    let data = form.value;
    if (!form.controls.content.pristine) {
      this.content = data.content;
    }
    let element = this.getElement();
    // console.log(element);
    this.update.emit({'element': element, 'pos': this.pos});
    this.hiddenForm = false;
  }
  getElement() {
    let element: {};
    return element = {
      'type': 'paragraph',
      'content': this.content,
      'class': this.eclass
    };
  }
  deleteElement() {
    // console.log('Delete Header', this.pos);
    this.delete.emit(this.pos);
  }

}
