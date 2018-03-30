import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormRenderService {
  formSubject: Subject<boolean> = new Subject();
  elements: any[] = [];
  disabled: boolean = false;
  constructor() { }

  updateForm(element, pos){
    this.elements[pos] = element;
    // console.log('Pos- ' + pos
    // console.log(element););
  }
  getForm(){
    this.formSubject.next(true);
  }
}
