import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-request-list',
  templateUrl: './admin-request-list.component.html',
  styleUrls: ['./admin-request-list.component.scss']
})
export class AdminRequestListComponent implements OnInit {

  constructor() { }
  requestList: { id: string, title: string, data: string }[] = [];

  ngOnInit() {
    //Get the data here!!!!
    this.requestList = [{ id: "41235345342", title: 'Census Data', data: "Request for data regarding the census data for thw year 2016-17. This data should be delivered in s structured manner with excel sheets providing major details" },
    { id: "41235345342", title: 'Census Data', data: "Request for data regarding the census data for thw year 2016-17. This data should be delivered in s structured manner with excel sheets providing major details" }]

  }

  @Output() loadRequest = new EventEmitter<{ id: string, title: string, data: string }>();

  loadIt(request: { id: string }) {
    console.log(request);
    for (let x of this.requestList) {
      if (x.id === request.id) {
        console.log(x);
        this.loadRequest.emit({ id: request.id, title: x.title, data: x.data });
      }
    }
  }

}
