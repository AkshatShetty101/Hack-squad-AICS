import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-requests',
  templateUrl: './admin-dashboard-requests.component.html',
  styleUrls: ['./admin-dashboard-requests.component.scss']
})
export class AdminDashboardRequestsComponent implements OnInit {
  requestToLoad: { id: string, title: string, data: string } = { id: 'default', title: 'default', data: 'default' };

  constructor() { }

  ngOnInit() { }

  previewIt(request: { id: string, title: string, data: string }) {
    this.requestToLoad = request;
  }
}
