import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { SSEService } from './sse.service';

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
        'notifs', { autoIncrement: true });
      let objectStore1 = evt.currentTarget.result.createObjectStore(
        'requests', { autoIncrement: true });
      // let objectStore1 = evt.currentTarget.result.createObjectStore(
      //   'forms', { keyPath: "id"});
      // objectStore.createIndex("code", "name", { unique: false });
      // objectStore.createIndex("objectId", "email", { unique: false });
      // objectStore.createIndex("propogatorId", "email", { unique: false });
      // objectStore.createIndex("timestamp", "email", { unique: false });
    });
  }

  addNotif(data: any) {
    return this.db.add('notifs', data);
  }

  // getAllNotifs() {
  //   this.db.getAll('notifs').then((people) => {
  //     console.log(people);
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }

  addRequest(data: { title: string, data: string }): { success: boolean, message: string } {
    let now = new Date();
    console.log(now);
    this.db.add('requests', { title: data.title, data: data.data })
      .then(() => {
        return { success: true, message: "Notif added successfully" };
      }, (error) => {
        console.log(error);
        return { success: false, message: "Notif not added" };
      });
    return { success: false, message: "Notif not added" };
  }

  getSpecificNotifs(data: string) {
    let list = [];
    return new Promise((res, rej) => {
      this.db.openCursor('notifs', (evt) => {
        var cursor = (<any>evt.target).result;
        if (cursor) {
          console.log(cursor);
          if (cursor.value.status === data) {
            console.log(cursor.value)
            list.push(cursor.value);
            console.log("matched stuff resolving");
          }
          else
            cursor.continue();
        } else {
          res(list);
        }
      });
    });
  }


  getAllRequests() {
    return this.db.getAll('requests');
  }


  deleteRequest(key: number) {
    this.db.delete('requests', key).then(() => {
      return { success: true, message: "Delete successfully" };
    }, (error) => {
      console.log(error);
      return { success: false, message: "Delete Unsuccessful" };
    });
  }

  getRequestByKey(data): any {

    return new Promise((res, rej) => {
      this.db.openCursor('requests', (evt) => {
        var cursor = (<any>evt.target).result;
        if (cursor) {
          console.log(cursor);
          if (cursor.key.toString() === data.toString()) {
            console.log(cursor.value)
            console.log("matched stuff resolving");
            res(cursor.value);
          }
          else
            cursor.continue();
        }
      });
    });
  }


  cursor(): { id: string, title: string, data: string }[] {
    let list: { id: string, title: string, data: string }[] = [];
    this.db.openCursor('requests', (evt) => {
      var cursor = (<any>evt.target).result;
      if (cursor) {
        console.log(cursor);
        list.push({ id: cursor.key.toString(), title: cursor.value.title, data: cursor.value.data });
        cursor.continue();
      } else {
        console.log('Entries all displayed.');
        return list;
      }
    });
    return list;
  }
}

