import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }
  requestToLoad: { id: string, title: string, data: string } = { id: "default", title: "default", data: "default" };
  ngOnInit() {
  }
  previewIt(request: { id: string, title: string, data: string }) {
    this.requestToLoad = request;
  }

}
