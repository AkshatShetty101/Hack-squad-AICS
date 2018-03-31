import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IndexDBService } from '../../../../shared/services/indexdb.service';
import { SSEService } from '../../../../shared/services/sse.service';

@Component({
  selector: 'app-admin-verifications-list',
  templateUrl: './admin-verifications-list.component.html',
  styleUrls: ['./admin-verifications-list.component.scss']
})
export class AdminVerificationsListComponent implements OnInit {

  constructor(private indexedDB: IndexDBService,
    private sse: SSEService,
    private ref: ChangeDetectorRef
  ) {
    const sse$ = this.sse.getNotif();
    sse$.subscribe(
      (event: any) => {
        console.log(JSON.parse(event.data).status);
        switch (JSON.parse(event.data).status) {
          case 'GC.ADMIN_ASS_FORM':
            this.getFreshData();
            break;
        }
      }
    );
  }

  approveFormList: { id: string, type: string }[] = [];
  assignFormList: { id: string }[] = [];
  ngOnInit() {
    // this.indexedDB.openConnection()
    //   .then((data) => {
    //     let notifs = this.indexedDB.getAllNotifs();
    //     console.log()
    //   }).catch((err) => {

    //   });
    this.indexedDB.getSpecificNotifs("GC.ADMIN_ASS_FORM").then((data: any) => {
      this.assignFormList = data;
      this.indexedDB.getSpecificNotifs("RA.ADMIN_APP_FORM").then((data: any) => {
        this.approveFormList = data;
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  getFreshData() {
    this.indexedDB.getSpecificNotifs("GC.ADMIN_ASS_FORM").then((data: any) => {
      this.assignFormList = data;
      this.indexedDB.getSpecificNotifs("RA.ADMIN_APP_FORM").then((data: any) => {
        this.approveFormList = data;
        this.ref.detectChanges();
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  @Output() loadRequest = new EventEmitter<{ id: string }>();

  loadIt(request: { id: string }) {
    console.log(request);
    for (let x of this.assignFormList) {
      if (x.id === request.id) {
        console.log(x);
        this.loadRequest.emit({ id: request.id });
      }
    }
  }

}
