import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularIndexedDB } from 'angular2-indexeddb';

@Injectable()
export class IndexDBService {
  private db = new AngularIndexedDB('myDb', 1);
  constructor() {
    // this.db = new AngularIndexedDB('myDb', 1);
  }
  openConnection() {
    // this.db = new AngularIndexedDB('myDb', 1);
    let ct = this.db.dbWrapper.dbVersion
    console.log(ct++);
    return this.db.openDatabase(ct, (evt) => {
      console.log(evt.currentTarget.result);
      let objectStore = evt.currentTarget.result.createObjectStore(
        'notifs', {autoIncrement: true });
        // let objectStore1 = evt.currentTarget.result.createObjectStore(
        //   'forms', { keyPath: "id"});
        // objectStore.createIndex("code", "name", { unique: false });
      // objectStore.createIndex("objectId", "email", { unique: false });
      // objectStore.createIndex("propogatorId", "email", { unique: false });
      // objectStore.createIndex("timestamp", "email", { unique: false });
    });
  }

  addNotif(data: { code: string,
     objectId: string,
      propogatorId: string,
       timestamp: string }):{success:boolean,message:string} {
    this.db.add('notifs', {
      code: data.code,
      objectId: data.objectId,
      propogatorId: data.propogatorId,
      timestamp: data.timestamp
    }).then(() => {
      return {success:true,message:"Notif added successfully"};
    }, (error) => {
      console.log(error);
      return {success:false,message:"Notif not added"};
    });
    return {success:false,message:"Notif not added"};    
  }

  getAllNotifs() {
    this.db.getAll('notifs').then((people) => {
      console.log(people);
    }, (error) => {
      console.log(error);
    });
  }
}
