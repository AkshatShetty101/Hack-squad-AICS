import { Observable } from 'rxjs/Rx';
import {
  Directive,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2,
  HostListener,
  EventEmitter
} from '@angular/core';

import { XY } from '../models/drag.model';

@Directive({
  selector: '[ngsfDrag]'
})
export class DragDirective {
  private initial: XY;
  private direction: string;

  @Input() translate: XY;
  @Input() type: string;
  @Output() movingOffset = new EventEmitter<XY>();
  @Output() directionOfMovement = new EventEmitter<string>();
  @Output() distinctDrop = new EventEmitter<any>();
  @Output() inputFunctionType = new EventEmitter<any>();


  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.initial = new XY();
    this.direction = undefined;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['translate'] && !changes['translate'].isFirstChange()) {
  //     let p = changes['position'].currentValue;
  //     console.log(p);
  //   }
  // }

  private informDirection() {
    this.directionOfMovement.emit(this.direction);
  }

  // private transform() {
  //   let value = `translate(${this.tempTrans.x + this.oldTrans.x}px, ${this.tempTrans.y + this.oldTrans.y}px)`;

  //   if (this.scale !== 1) {
  //     value += ` scale(${this.scale})`;
  //   }

  //   this.renderer.setStyle(this.el.nativeElement, 'transform', value);
  //   this.renderer.setStyle(this.el.nativeElement, '-webkit-transform', value);
  //   this.renderer.setStyle(this.el.nativeElement, '-ms-transform', value);
  //   this.renderer.setStyle(this.el.nativeElement, '-moz-transform', value);
  //   this.renderer.setStyle(this.el.nativeElement, '-o-transform', value);
  // }

  @HostListener('dragstart', ['$event'])
  dragStarted(event) {
    console.log(event);
    this.initial = new XY({
      x: event.x,
      y: event.y
    });
    console.log(this.el.nativeElement);
    if (this.el.nativeElement.className === 'tool') {
      this.inputFunctionType.emit(
        this.el.nativeElement.id
      );
    }
   }

  @HostListener('drag', ['$event'])
  elementMoving(event) {
    // console.log(event.offsetY);
    const change = this.initial.diff(new XY({ x: event.x, y: event.y }));
    if (change.y < 0 && (this.direction !== 'down' || this.direction === undefined)) {
      this.direction = 'down';
      this.informDirection();
    } else if (change.y > 0 && (this.direction !== 'up' || this.direction === undefined)) {
      this.direction = 'up';
      this.informDirection();
    }
    this.movingOffset.emit(change);
  }
}
