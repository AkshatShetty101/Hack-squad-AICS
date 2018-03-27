import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class FormBuildService {
  formSubject: Subject<boolean> = new Subject();
  elements: any[] = [];
  constructor() { }

  updateForm(element, pos){
    this.elements[pos] = element;
    // console.log('Pos- ' + pos);
    // console.log(element);
  }
  getForm(){
    this.formSubject.next(true);
  }
}
