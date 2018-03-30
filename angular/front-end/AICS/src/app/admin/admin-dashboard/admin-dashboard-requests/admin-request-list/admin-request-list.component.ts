import { IndexDBService } from './../../../../shared/services/indexdb.service';
import { GraphQLService } from './../../../../shared/services/graphql.service';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-request-list',
  templateUrl: './admin-request-list.component.html',
  styleUrls: ['./admin-request-list.component.scss']
})
export class AdminRequestListComponent implements OnInit {
  requestList: { id: string, title: string, data: string }[] = [];
  @Output() loadRequest = new EventEmitter<{ id: string, title: string, data: string }>();
  @Output() lr = new EventEmitter<{}>();
  constructor(
    private gql: GraphQLService,
    private idb: IndexDBService,
    private ref: ChangeDetectorRef
  ) {
    this.idb.notifs.asObservable().subscribe(
      (event: any) => {
        console.log(event);
        switch (event.status) {
          case 'RA_MAKE_REQ':
            this.getFreshData();
            break;
        }
      }
    );
   }


  ngOnInit() {
    //Get the data here!!!!
<<<<<<< HEAD
    // this.requestList = [
    //   {
    //     id: '41235345342',
    //     title: 'Census Data',
    //     data: 'Request for data regarding the census data for thw year 2016-17. This data should be delivered in s structured manner with excel sheets providing major details'
    //   },
    //   {
    //     id: '41235345342',
    //     title: 'Census Data',
    //     data: 'Request for data regarding the census data for thw year 2016-17. This data should be delivered in s structured manner with excel sheets providing major details'
    //   }
    // ];
    this.getFreshData();
  }

  getFreshData() {
    this.gql.loadRequestedFormData()
      .subscribe(
        (data: any) => {
          this.requestList = [];
          data.data.reqFormOwn.forEach(
            (element: any) => {
              console.log(element);
              const { title, description } = element.data, id = element._id;
              this.requestList.push({ id: id, title: title, data: description });
            });
            this.ref.detectChanges();
            this.loadShit();
        },
        (err) => {
          console.log(err);
        }
      );
=======
    this.requestList = [
      {
        id: '41235345342',
        title: 'Census Data',
        data: 'Request for data regarding the census data for thw year 2016-17. This data should be delivered in s structured manner with excel sheets providing major details'
      },
      {
        id: '41235345342',
        title: 'Census Data',
        data: 'Request for data regarding the census data for thw year 2016-17. This data should be delivered in s structured manner with excel sheets providing major details'
      }
    ];
    // this.gql.loadRequestedFormData()
      // .subscribe(
      //   (data: any) => {
      //     this.requestList = [];
      //     data.data.reqFormOwn.forEach(
      //       (element: any) => {
      //         console.log(element);
      //         const { title, description } = element.data, id = element._id;
      //         this.requestList.push({ id: id, title: title, data: description });
      //       });
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
>>>>>>> 56e5219861500c0f0f9fca4600d66482eebd4dd9
  }

  loadShit(){
    this.lr.emit();
  }

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
