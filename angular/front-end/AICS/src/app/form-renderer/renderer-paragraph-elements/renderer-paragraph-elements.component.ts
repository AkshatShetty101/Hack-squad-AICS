import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-renderer-paragraph-elements',
  templateUrl: './renderer-paragraph-elements.component.html',
  styleUrls: ['./renderer-paragraph-elements.component.css']
})
export class RendererParagraphElementsComponent implements OnInit {
  @Input() content;
  @Input() eclass;
  @Input() pos;
  constructor() { }

  ngOnInit() {
    // console.log(this.pos);
  }
  getElement() {
    let element: {};
    return element = {
      'type': 'paragraph',
      'content': this.content,
      'class': this.eclass
    };
  }

}
