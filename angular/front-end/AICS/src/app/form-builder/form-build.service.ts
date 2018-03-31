import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Table, Row, Column } from '../shared/models/table.model';
@Injectable()
export class FormBuildService {
  formSubject: Subject<boolean> = new Subject();
  table: Table;
  templateId: any;
  route: string;
  requestId: any;
  constructor() { }
  updateForm(element, pos){
    let r, c, i;
    [r, c, i] = pos.split('-');
    this.table.rows[r].cols[c].value[i] = element;
    console.log('Pos- ' + pos);
    console.log(element);
  }
  getForm(){
    this.formSubject.next(true);
  }
  initForm(){
    this.table = new Table();
    let col = new Column();
    let row = new Row();
    row.cols.push(col);
    this.table.rows.push(row);
  }
}
