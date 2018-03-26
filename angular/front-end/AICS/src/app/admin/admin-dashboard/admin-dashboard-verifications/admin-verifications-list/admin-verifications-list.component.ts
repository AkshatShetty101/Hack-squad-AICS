import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IndexDBService } from '../../../../shared/services/indexdb.service';

@Component({
  selector: 'app-admin-verifications-list',
  templateUrl: './admin-verifications-list.component.html',
  styleUrls: ['./admin-verifications-list.component.scss']
})
export class AdminVerificationsListComponent implements OnInit {

  constructor(private indexedDB: IndexDBService) { }
  formList: { id: string, type: string }[] = [];

  ngOnInit() {
    this.indexedDB.openConnection()
      .then((data) => {
        let notifs = this.indexedDB.getAllNotifs();
        console.log()
      }).catch((err) => {

      });
    this.formList = [{ id: "41235345342", type: "approve" },
    { id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },{ id: "41235345342", type: "approve" },]
  }

  @Output() loadRequest = new EventEmitter<{ id: string}>();

  loadIt(request: { id: string }) {
    console.log(request);
    for (let x of this.formList) {
      if (x.id === request.id) {
        console.log(x);
        this.loadRequest.emit({ id: request.id});
      }
    }
  }

}
