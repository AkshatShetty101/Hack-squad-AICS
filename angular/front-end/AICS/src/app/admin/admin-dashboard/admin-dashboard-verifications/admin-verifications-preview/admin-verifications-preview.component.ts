import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-verifications-preview',
  templateUrl: './admin-verifications-preview.component.html',
  styleUrls: ['./admin-verifications-preview.component.scss']
})
export class AdminVerificationsPreviewComponent implements OnInit {
  @Input() data: { id: string, type: string } = {
    id: "default",
    type: "default"
  };
  reqData: { id: string, title: string, data: string } = { id: "default", title: "default", data: "default" };
  constructor() { }

  ngOnInit() {
    //load the request data for the form id
    this.reqData = { id: "41235345342", title: 'Census Data', data: "Request for data regarding the census data for thw year 2016-17. This data should be delivered in s structured manner with excel sheets providing major details" };
  }

}
