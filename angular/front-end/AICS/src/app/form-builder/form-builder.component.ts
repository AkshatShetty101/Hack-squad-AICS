import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { DragEventConfig, DragEventParticipant, XY } from '../shared/models/drag.model';
import { AfterViewChecked } from '@angular/core';
import { FormBuildService } from './form-build.service';

@Component({
  selector: 'ngsf-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChildren('refElement') ref: any;
  elements: any[] = [];
  table: any;
  // F this lint
  dropEventsList: any[] = [];
  toolConfigs: DragEventConfig[] = [];
  elConfigs: DragEventConfig[] = [];
  source: DragEventParticipant;
  target: DragEventParticipant;
  participantsMap: {} = {};
  dropParameter: { direction: string, placement: InsertPosition };
  elHTMLs: HTMLElement[] = [];
  toolHTMLs: HTMLElement[] = [];
  dropZoneHTMLs: HTMLElement;
  inputFunctionType: string;
  toolButtons: any[] = [
    { 'id': 'input_text', 'message': 'Add Input Text', 'fn': this.addInput, 'params': ['text', ''] },
    { 'id': 'input_number', 'message': 'Add Input Number', 'fn': this.addInput, 'params': ['number', ''] },
    { 'id': 'input_date', 'message': 'Add Input Date', 'fn': this.addInput, 'params': ['date', ''] },
    { 'id': 'input_file', 'message': 'Add Input File', 'fn': this.addInput, 'params': ['file', ''] },
    { 'id': 'header', 'message': 'Add Header', 'fn': this.addHeader, 'params': ['h1', ''] },
    { 'id': 'paragraph', 'message': 'Add Paragraph', 'fn': this.addParagraph, 'params': [''] },
    { 'id': 'textarea', 'message': 'Add Textarea', 'fn': this.addTextarea, 'params': [''] },
    { 'id': 'group_rad', 'message': 'Add Radio Group', 'fn': this.addGroup, 'params': ['radio', ''] },
    { 'id': 'group_chk', 'message': 'Add Checkbox Group', 'fn': this.addGroup, 'params': ['checkbox', ''] },
    { 'id': 'select', 'message': 'Add Select Group', 'fn': this.addSelect, 'params': ['', ''] }
  ];
  @ViewChildren('elements', { read: ElementRef }) elRefs: any;
  @ViewChildren('tools', { read: ElementRef }) toolRefs: any;
  @ViewChild('dropZone', { read: ElementRef }) dropZoneRef: ElementRef;
  constructor(
    private formBuild: FormBuildService,
    private parentRef: ElementRef
  ) {
    Observable.fromEvent(this.parentRef.nativeElement, 'drop')
      .filter((event) => {
        console.log(event);
        console.log(this.dropEventsList);
        if (this.dropEventsList === []) {
          return true;
        }
        if (this.dropEventsList !== []) {
          if (event !== this.dropEventsList[0]) {
            return true;
          } else {
            this.dropEventsList = [];
            return false;
          }
        }
      })
      .subscribe((event) => {
        this.dropEventsList.push(event);
        console.log(this.dropEventsList);
        this.dropped(event);
      });
    this.toolConfigs = this.toolButtons.map(() => new DragEventConfig());
  }

  ngOnInit() {
    this.elements = this.formBuild.elements;
    this.table = {
      'type': 'table',
      'subtype': '',
      'class': '',
      'label': '',
      'width': '100',
      'height': '100',
      'rows': [
        {
          height: 'auto',
          'cols': [
            {
              height: '100',
              width: '100',
              value: this.elements,
              editable: 'true',
            }
            // },
            // {
            //   height: '100',
            //   width: '100',
            //   value: [this.elements[1], this.elements[2]],
            //   editable: 'true',
            // }
          ]
        }
      ]
    };
    for (const element of this.elements) {
      this.elConfigs.push(new DragEventConfig());
    }
  }

  ngAfterViewInit() {
    this.toolHTMLs = this.toolRefs._results.map((ref) => ref.nativeElement);
    // console.log(this.elRefs);
    if (this.elRefs._results) {
      this.elHTMLs = this.elRefs._results.map((ref) => {
        this.elConfigs.push(new DragEventConfig());
        return ref.nativeElement;
      });
    } else {
      this.elHTMLs = [];
      this.elConfigs = [];
    }
    // console.log(this.toolHTMLs);
    this.participantsMap['tool'] = this.toolHTMLs;
    // console.log(this.dropZoneRef);
    this.participantsMap['dropZone'] = [this.dropZoneRef.nativeElement];
    this.participantsMap['element'] = [];
    // console.log(this.participantsMap);
    //  console.log(
    this.elRefs._results.map((ref) => ref.nativeElement.firstChild);
  }
  ngAfterViewChecked() {
    // console.log(
    // this.elRefs._results.map((ref) => ref.nativeElement.firstChild)
    // );
    this.elHTMLs = this.elRefs._results.map((ref) => ref.nativeElement.firstChild);
  }

  dragStart(event) {
    //  console.log(this.elements);
    let el = this.getValidElement(event.path[0]);
    //  console.log(el);
    //  console.log(el.className);
    this.source = new DragEventParticipant({ el: el });
    this.elHTMLs.forEach(x => console.log(x));
    switch (this.identifyDragEventParticipant(el)) {
      case 'tool':
        this.source.type = 'tool';
        break;
      case 'element':
        //  console.log('start');
        for (const i in this.elHTMLs) {
          if (this.elHTMLs[i] !== el) {
            //  console.log(i);
            this.elConfigs[i].draggable = false;
          }
        }
        event.dataTransfer.effectAllowed = 'move';
      // console.log(this.elConfigs.map(x => x.draggable));
    }
    // console.log(this.identifyDragEventParticipant(el));
    // console.log(this.source);
  }

  dragEnd(event) {
    //  console.log(this.elements);
    let el = this.getValidElement(event.path[0]);
    // this.source = null;
    switch (this.identifyDragEventParticipant(el)) {
      case 'element':
        //  console.log('end');
        this.elConfigs.forEach(x => x.draggable = true);
      // this.range(0, this.elements.length - 1)
      //   .filter((i) => this.elHTMLs[i] !== el)
      //   .forEach((i) => this.elConfigs[i].draggable = true);
      // console.log(this.elConfigs.map(x => x.draggable));
    }
    // console.log(this.identifyDragEventParticipant(el));
    // console.log(this.source);
  }

  // moveTarget(offset: XY) {
  //   // //console.log(offset);

  // }

  movementOfTarget(direction: string) {
    // console.log(direction);
    switch (direction) {
      case 'down':
        this.dropParameter = {
          direction: 'down',
          placement: 'afterend'
        };
        break;
      case 'up': this.dropParameter = {
        direction: 'up',
        placement: 'beforebegin'
      };
    }
  }

  dragEnter(event) {
    event.preventDefault();
    //  console.log('enter');
    //  console.log(this.elements);
    let el = this.getValidElement(event.path[0]);
    //  console.log(el);
    this.target = new DragEventParticipant({ el: el });
    if (this.identifyDragEventParticipant(el) === 'dropZone') {
      this.target.type = 'dropZone';
    }
    // console.log(this.identifyDragEventParticipant(el));
    // console.log(this.target);
  }

  dragOver(event) {
    event.preventDefault();
    // console.log(this.source);
    // console.log(this.target);
    if (this.source.type === 'element' && this.target.type === 'element') {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  dragLeave(event) {
    // this.target = null;
  }

  dropped(event) {
    event.preventDefault();
    console.log('dropping');
    console.log(this.target);
    console.log(this.source);
    // console.log(this.source);
    // console.log(this.target);
    // console.log('dropping');
    if (this.target.type === 'dropZone' && this.source.type === 'tool') {
      // console.log(this.toolHTMLs);
      // console.log(this.source.el);
      // console.log(this.indexOf(this.toolHTMLs, this.source.el));
      // const index = this.indexOf(this.toolHTMLs, this.source.el);
      this.elConfigs.push(new DragEventConfig());
      let button = this.toolButtons.filter(
        btn => btn['id'] === this.inputFunctionType
      )[0];
      this.elements.push(button.fn(...button.params));
    } else if (this.source.type === 'element' && this.target.type === 'element') {
      console.log(this.elHTMLs);
      console.log(this.elements);
      const srcID = this.elHTMLs.indexOf(this.source.el),
        tgtID = this.elHTMLs.indexOf(this.target.el);
      console.log(srcID + '~' + tgtID);
      console.log(this.pairs(srcID, tgtID));
      for (const [x, y] of this.pairs(srcID, tgtID)) {
        // [this.elements[x], this.elements[y]] = [this.elements[y], this.elements[x]];
        console.log([x, y]);
        const temp = this.elements[x];
        this.elements[x] = this.elements[y];
        this.elements[y] = temp;
      }
      // [this.data[srcID], this.data[tgtID]] = [this.data[tgtID], this.data[srcID]];
      // console.log(this.elements);
      // this.target.el.insertAdjacentElement(this.dropParameter.placement, this.source.el);
    }
    // console.log(this.elements);
  }

  getValidElement(el) {
    if (el.className === 'tool' || el.className === 'dropZone') {
      return el;
    } else if (el.className !== 'elementHolder') {
      //  console.log('Not element holder');
      return el.closest('.elementHolder');
    }
    return el;
  }

  identifyDragEventParticipant(el: HTMLElement) {
    for (const type in this.participantsMap) {
      // //console.log(this.participantsMap[type]);
      if (this.participantsMap[type].indexOf(el) > -1) {
        return type;
      }
    }
    return 'element';
  }

  pairs(srcID, tgtID) {
    const x = this.range(srcID, tgtID);
    return this.zip([
      x.slice(0, -1),
      x.slice(1)
    ]);
  }

  zip(arrays) {
    return Array.apply(null, Array(arrays[0].length)).map(function (_, i) {
      return arrays.map(function (array) { return array[i]; });
    });
  }

  range(start, end, step = 1) {
    const sign = start <= end ? 1 : -1,
      len = Math.abs(Math.floor((end - start) / step)) + 1;
    return Array(len).fill(0).map((_, i) => start + (i * step * sign));
  }

  indexOf(arr: any[], el: any, key?: string) {
    for (const i in arr) {
      if (key !== undefined) {
        if (arr[i][key] === el) {
          return +i;
        }
      } else {
        if (arr[i] === el) {
          return +i;
        }
      }
    }
    return -1;
  }

  addInput(subtype: string, eclass: string) {
    // console.log(subtype+"-"+eclass+'0');
    let element: any;
    if (subtype === 'date') {
      element = {
        'type': 'input',
        'subtype': subtype,
        'class': eclass,
        'label': 'Date Field',
        'value': '',
        'required': 'false',
        'placeholder': 'Enter date...',
        'maxlength': '',
        'max': '',
        'min': '',
        'valid': 'false',
        'pristine': 'true',
        'touched': 'false'
      };
    } else
      if (subtype === 'text') {
        element = {
          'type': 'input',
          'subtype': subtype,
          'class': eclass,
          'label': 'Text Field',
          'value': '',
          'required': 'false',
          'placeholder': 'Enter text..',
          'maxlength': '',
          'max': '',
          'min': '',
          'valid': 'false',
          'pristine': 'true',
          'touched': 'false'
        };
      } else
        if (subtype === 'number') {
          element = {
            'type': 'input',
            'subtype': subtype,
            'class': eclass,
            'label': 'Number Field',
            'value': '',
            'required': 'false',
            'placeholder': 'Enter number...',
            'maxlength': '',
            'min': '',
            'max': '',
            'valid': 'false',
            'pristine': 'true',
            'touched': 'false'
          };
        } else
          if (subtype === 'file') {
            element = {
              'type': 'input',
              'subtype': subtype,
              'class': eclass,
              'label': 'File Upload',
              'value': '',
              'required': 'false',
              'placeholder': 'Upload file...',
              'maxlength': '',
              'min': '',
              'max': '',
              'valid': 'false',
              'pristine': 'true',
              'touched': 'false'
            };
          }
    return element;
  }

  addHeader(eclass: string) {
    let element: {};
    element = {
      'class': eclass,
      'label': 'Header',
      'subtype': 'h1',
      'type': 'header'
    };
    return element;
  }

  addParagraph(eclass: string) {
    let element: {};
    element = {
      'type': 'paragraph',
      'class': '',
      'content': 'This is a paragraph...'
    };
    return element;
  }

  addTextarea(eclass: string) {
    let element: {};
    element = {
      'type': 'textarea',
      'class': '',
      'label': 'Text-area',
      'value': '',
      'required': 'true',
      'rows': '5',
      'cols': '10',
      'placeholder': 'This is a textarea...',
      'valid': 'false',
      'pristine': 'true',
      'touched': 'false'
    };
    return element;
  }

  addGroup(subtype: string, eclass: string) {
    let element: {};
    if (subtype === 'radio') {
      element = {
        'type': 'group',
        'subtype': 'radio',
        'class': '',
        'value': '',
        'required': 'false',
        'options': [{ 'label': 'option1', 'value': 'option1' }],
        'valid': 'false',
        'pristine': 'true',
        'touched': 'false'
      };
    } else {
      element = {
        'type': 'group',
        'subtype': 'checkbox',
        'class': '',
        'value': [],
        'required': 'false',
        'options': [{ 'label': 'option1', 'value': 'option1' }],
        'valid': 'false',
        'pristine': 'true',
        'touched': 'false'
      };
    }
    return element;
  }
  addSelect(subtype: string, eclass: string) {
    let element: {};
    element = {
      'type': 'select',
      'subtype': '',
      'class': '',
      'value': '',
      'required': 'false',
      'options': [{ 'label': 'option1', 'value': 'option1' }],
      'valid': 'false',
      'pristine': 'true',
      'touched': 'false'
    };
    return element;
  }
  updateElement(element, pos) {
    this.elements[pos] = element;
    //  console.log(element);
  }

  deleteElement(pos) {
    // console.log('clicked delete outside!', pos);
    this.elements.splice(pos, 1);
  }

  closeForm() {
  }
}
