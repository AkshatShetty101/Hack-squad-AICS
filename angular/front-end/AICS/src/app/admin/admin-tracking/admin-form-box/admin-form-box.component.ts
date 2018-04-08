import { Component, Input, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-admin-form-box',
  templateUrl: './admin-form-box.component.html',
  styleUrls: ['./admin-form-box.component.scss']
})
export class AdminFormBoxComponent implements OnInit, AfterContentInit {
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
