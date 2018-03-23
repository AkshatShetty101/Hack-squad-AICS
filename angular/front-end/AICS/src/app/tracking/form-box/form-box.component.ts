import { Component, Input, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss']
})
export class FormBoxComponent implements OnInit, AfterContentInit {
  @Input() form: { id: string, id1: string } = { id: "default",id1:"default" };
  @Input() cl: string = "default";
  constructor() { }
  ngAfterContentInit() {
    console.log(this.form);
    this.form.id1 = this.form.id.substring((this.form.id.length-5),this.form.id.length); 
    this.cl = this.cl+" rectangle_css";
    console.log(this.cl);
  }
  ngOnInit() {
  }

}
