import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  formList: { id: string; }[] = [{ id: "5ab08e28ecf6d91e5e1de9a2" },
  { id: "5ab08e28ecf6d91e5e1de9a2" },
  { id: "5ab08e28ecf6d91e5e1de9a2" },
  { id: "5ab08e28ecf6d91e5e1de9a2" },
  { id: "5ab08e28ecf6d91e5e1de9a2" },
  { id: "5ab08e28ecf6d91e5e1de9a2" },
  { id: "5ab08e28ecf6d91e5e1de9a2" },
  { id: "5ab08e28ecf6d91e5e1de9a2" },
  { id: "5ab08e28ecf6d91e5e1de9a2" }]
  constructor() { }

  ngOnInit() {
  }

}
