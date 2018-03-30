import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IndexDBService } from '../../../../shared/services/indexdb.service';

@Component({
  selector: 'app-ra-request-list',
  templateUrl: './ra-request-list.component.html',
  styleUrls: ['./ra-request-list.component.scss']
})
export class RaRequestListComponent implements OnInit {

  constructor(private indexedDB: IndexDBService) { }
  dbrequestList: { id: string, title: string, data: string }[] = [];
  idbrequestList: { id: string, title: string, data: string }[] = [];

  ngOnInit() {
    //Get the data here!!!!
    let dbrequestList: { id: string, title: string, data: string }[] = [{ id: "41235345342", title: 'Census Data', data: "Request for data regarding the census data for thw year 2016-17. This data should be delivered in s structured manner with excel sheets providing major details" },
    { id: "41235345342", title: 'Census Data', data: "Request for data regarding the census data for thw year 2016-17. This data should be delivered in s structured manner with excel sheets providing major details" }]
    let idbrequestList: { id: string, title: string, data: string }[];
    this.indexedDB.openConnection().then(() => {
      this.dbrequestList = dbrequestList;
      new Promise((resolve, reject) => {
      this.idbrequestList = this.indexedDB.cursor();
      //   resolve(idbrequestList);
      // }).then((data) => {
      //   this.requestList.concat(data);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  @Output() loadRequest = new EventEmitter<{ id: string, title: string, data: string, type:string }>();

  loadIt(request: { id: string }) {
    console.log(request);
    for (let x of this.idbrequestList) {
      if (x.id === request.id) {
        console.log(x);
        this.loadRequest.emit({ id: request.id, title: x.title, data: x.data, type:'incomplete' });
      }
    }
  }

  loadIt1(request: { id: string }) {
    console.log(request);
    for (let x of this.dbrequestList) {
      if (x.id === request.id) {
        console.log(x);
        this.loadRequest.emit({ id: request.id, title: x.title, data: x.data, type:'submitted'});
      }
    }
  }


}
