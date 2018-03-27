import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-renderer-header-elements',
  templateUrl: './renderer-header-elements.component.html',
  styleUrls: ['./renderer-header-elements.component.css']
})
export class RendererHeaderElementsComponent implements OnInit {
  @Input() label;
  @Input() subtype;
  @Input() eclass;
  @Input() pos;
  constructor() { }

  ngOnInit() {
    // console.log(this.pos);
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

}
