import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-preview',
  templateUrl: './admin-preview.component.html',
  styleUrls: ['./admin-preview.component.scss']
})
export class AdminPreviewComponent implements OnInit {
  @Input() data :{id:string,title:string,data:string}={id:"default",data:"default",title:"default"};
  @Input() t:number;
  constructor() { }

  ngOnInit() {
    console.log(this.t);
  }

}
