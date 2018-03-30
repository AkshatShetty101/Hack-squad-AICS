import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IndexDBService } from '../../../../shared/services/indexdb.service';
import { GraphQLService } from '../../../../shared/services/graphql.service';

@Component({
  selector: 'app-ra-request-list',
  templateUrl: './ra-request-list.component.html',
  styleUrls: ['./ra-request-list.component.scss']
})
export class RaRequestListComponent implements OnInit {

  constructor(
    private indexedDB: IndexDBService,
    private graphql: GraphQLService) { }
  dbrequestList: { _id: string, data: { title: string, data: string } }[] = [];
  idbrequestList: { id: string, title: string, data: string }[] = [];

  ngOnInit() {
    //Get the data here!!!!
    this.graphql.loadDbRequestList().subscribe((data) => {
      Object.keys(data.data.reqFormMany).forEach((i) => {
        this.dbrequestList.push(data.data.reqFormMany[i]);
      });
      // for(let a in data.data.reqFormsMany){
      //   this.dbrequestList.push(data.data.reqFormMany[a]);
      // }
      console.log(data.data.reqFormMany);
      console.log(this.dbrequestList);
      let idbrequestList: { id: string, title: string, data: string }[];
      this.idbrequestList = this.indexedDB.cursor();
    }, (err) => {
      console.log(err);
    });
  }

  @Output() loadRequest = new EventEmitter<{ id: string, title: string, data: string, type: string }>();

  loadIt(request: { id: string }) {
    console.log(request);
    for (let x of this.idbrequestList) {
      if (x.id === request.id) {
        console.log(x);
        this.loadRequest.emit({ id: request.id, title: x.title, data: x.data, type: 'incomplete' });
      }
    }
  }

  loadIt1(request: { id: string }) {
    console.log(request);
    for (let x of this.dbrequestList) {
      if (x._id === request.id) {
        console.log(x);
        this.loadRequest.emit({ id: request.id, title: x.data.title, data: x.data.data, type: 'submitted' });
      }
    }
  }


}
