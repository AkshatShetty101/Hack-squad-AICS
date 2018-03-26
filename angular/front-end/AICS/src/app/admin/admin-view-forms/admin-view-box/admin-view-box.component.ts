import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-view-box',
  templateUrl: './admin-view-box.component.html',
  styleUrls: ['./admin-view-box.component.scss']
})
export class AdminViewBoxComponent implements OnInit {
  @Input()cl:string;
  @Input()form:{ id: string, title: string, division: string, deadline: number };
  constructor() { }

  ngOnInit() {
  }

}
