import { Component, OnInit } from '@angular/core';
import { IndexDBService } from '../../../shared/services/indexdb.service';

@Component({
  selector: 'app-admin-dashboard-verifications',
  templateUrl: './admin-dashboard-verifications.component.html',
  styleUrls: ['./admin-dashboard-verifications.component.scss']
})
export class AdminDashboardVerificationsComponent implements OnInit {

  constructor(private IndexDB: IndexDBService) { }
  requestToLoad: { id: string} = { id: "default"};
  ngOnInit() {
    console.log('from here!!!!');
  }
  previewIt(request: { id: string}) {
    this.requestToLoad = request;
  }
}
