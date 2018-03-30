import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Table, Row, Column } from '../shared/models/table.model';
@Injectable()
export class FormBuildService {
  formSubject: Subject<boolean> = new Subject();
  table: Table;
  constructor() { }
  updateForm(element, pos){
    let r, c, i;
    [r, c, i] = pos.split('-');
    this.table[r][c][i] = element;
    // console.log('Pos- ' + pos);
    // console.log(element);
  }
  getForm(){
    this.formSubject.next(true);
  }
  initForm(){
    this.table = new Table();
    let col = new Column();
    console.log(col);
    let row = new Row();
    console.log(row);
    row.cols.push(col);
    this.table.rows.push(row);
    console.log(this.table);
  }
}
