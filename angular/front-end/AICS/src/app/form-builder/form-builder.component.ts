import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { DragEventConfig, DragEventParticipant, XY } from '../shared/models/drag.model';
import { AfterViewChecked } from '@angular/core';
import { FormBuildService } from './form-build.service';
import { FormRenderService } from '../form-renderer/form-render.service';
import { HttpService } from '../shared/services/http.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { setTimeout } from 'timers';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit, AfterViewInit, AfterViewChecked {
  random: any;
  table: any;
  selectedRow: number;
  selectedCol: number;
  modalOpen: boolean = false;
  formTitle: FormControl = new FormControl();
  formTag: FormControl = new FormControl();
  // F this lint
  dropEventsList: any[] = [];
  toolConfigs: DragEventConfig[] = [];
  elConfigs: DragEventConfig[][][] = [];
  source: DragEventParticipant;
  target: DragEventParticipant;
  participantsMap: {} = {};
  dropParameter: { direction: string, placement: InsertPosition };
  elHTMLs: Element[][][] = [];
  toolHTMLs: HTMLElement[] = [];
  dropZoneHTMLs: HTMLElement[] = [];
  inputFunctionType: string;
  tags:string[] = [];
  separatorKeysCodes = [ENTER, COMMA];
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
  @ViewChildren('tools', { read: ElementRef }) toolRefs: any;
  @ViewChild('tableRef', { read: ElementRef }) tableRef: any;

  // olderParentHTML: HTMLElement = null;
  dropZonesMap: Map<HTMLElement, any>;

  constructor(
    private formBuild: FormBuildService,
    private parentRef: ElementRef,
    private formRender: FormRenderService,
    private http: HttpService,
    private changeRef: ChangeDetectorRef,
    private router: Router
  ) {
    Observable.fromEvent(this.parentRef.nativeElement, 'drop')
      .filter((event) => {
        // console.log(event);
        // console.log(this.dropEventsList);
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
        // console.log(this.dropEventsList);
        this.dropped(event);
      });
    this.toolConfigs = this.toolButtons.map(() => new DragEventConfig());
  }

  ngOnInit() {
    this.formBuild.initForm();
    this.table = this.formBuild.table;
    console.log(this.table);
    this.table.rows.forEach((_, r) => {
      this.elConfigs.push([]);
      this.table.rows[r].cols.forEach((_, c) => {
        this.elConfigs[r].push([]);
        this.table.rows[r].cols[c].value.forEach((_, v) => {
          this.elConfigs[r][c].push(new DragEventConfig());
        });
      });
    });
    // console.log(this.elConfigs);
  }

  ngAfterViewInit() {
    this.updateHTMLVariables();
    this.toolHTMLs = this.toolRefs._results.map((ref) => ref.nativeElement);
    this.participantsMap['tool'] = this.toolHTMLs;
  }

  ngAfterViewChecked() {
    // console.log(this.formBuild.table);
    this.table = this.formBuild.table;
    this.changeRef.detectChanges();
    this.updateHTMLVariables();
    // console.log(this.dropZonesMap);
    // console.log(this.participantsMap);
  }


  updateHTMLVariables() {
    this.elHTMLs = [], this.elConfigs = [], this.dropZoneHTMLs = [], this.dropZonesMap = new Map();
    const table = this.tableRef.nativeElement;
    Array.from(table.children).forEach((_, r) => {
      this.elHTMLs.push([]);
      this.elConfigs.push([]);
      Array.from(table.children[r].children).forEach((dropZoneHTML: any, c) => {
        this.elHTMLs[r].push([]), this.elConfigs[r].push([]), this.dropZoneHTMLs.push(dropZoneHTML);
        this.dropZonesMap.set(dropZoneHTML, { r: r, c: c });
        Array.from(table.children[r].children[c].children).forEach((div: Element, v) => {
          // const x: HTMLElement = div.querySelector('.elementHolder');
          console.log();
          this.elHTMLs[r][c].push(div.querySelector('.elementHolder'));
          this.elConfigs[r][c].push(new DragEventConfig());
        });
      });
    });
    this.participantsMap['dropZone'] = this.dropZoneHTMLs;
  }
  updateWidth() {
    let col: any;
    let width = 80 / (this.table.rows[this.selectedRow].cols.length);
    for (col of this.table.rows[this.selectedRow].cols) {
      col.width = width;
    }
  }
  addRow() {
    let row = {
      height: 100,
      'cols': [
        {
          height: 100,
          width: 100,
          value: [],
          editable: true,
        }
      ]
    };
    this.table.rows.push(row);
    // console.log(this.table);
  }
  addCol() {
    let col = {
      height: 100,
      width: 100,
      value: [],
      editable: true,
    };
    this.table.rows[this.selectedRow].cols.push(col);
    this.updateWidth();
    // console.log(this.table);
  }
  deleteRow() {
    console.log(this.selectedRow);
    this.table.rows.splice(this.selectedRow, 1);
  }
  deleteCol() {
    console.log(this.selectedCol);
    this.table.rows[this.selectedRow].cols.splice(this.selectedCol, 1);
    if (this.table.rows[this.selectedRow].cols.length === 0) {
      this.table.rows.splice(this.selectedRow, 1);
    }
    this.updateWidth();
  }
  dragStart(event) {
    const el = this.getValidElement(event.path[0]);
    this.source = new DragEventParticipant({ el: el });
    switch (this.identifyDragEventParticipant(el)) {
      case 'tool':
        this.source.type = 'tool';
        break;
      case 'element':
        this.source.parentDropZone = el.closest('.dropZone');
        this.elConfigs.forEach((_, r) => {
          this.elConfigs[r].forEach((_, c) => {
            this.elConfigs[r][c].forEach((_, v) => {
              if (this.elConfigs[r][c][v] !== el) {
                this.elConfigs[r][c][v].draggable = false;
              }
            });
          });
        });
        event.dataTransfer.effectAllowed = 'move';
    }
  }

  dragEnd(event) {
    const el = this.getValidElement(event.path[0]);
    switch (this.identifyDragEventParticipant(el)) {
      case 'element':
        this.elConfigs.forEach((_, r) => {
          this.elConfigs[r].forEach((_, c) => {
            this.elConfigs[r][c].forEach((_, v) => {
              if (this.elConfigs[r][c][v] !== el) {
                this.elConfigs[r][c][v].draggable = false;
              }
            });
          });
        });
    }
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
    const el = this.getValidElement(event.path[0]);
    this.target = new DragEventParticipant({ el: el });
    if (el.className === 'dropZone') {
      this.target.type = 'dropZone';
    } else if (el.className === 'elementHolder') {
      this.target.parentDropZone = el.closest('.dropZone');
    }
  }

  dragOver(event) {
    event.preventDefault();
    if (this.source.type === 'element' && this.target.type === 'element') {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  dragLeave(event) {
    // this.target = null;
  }

  dropped(event) {
    event.preventDefault();
    // console.log('dropping in ' + this.selectedRow + '-' + this.selectedCol);
    // console.log(this.target);
    // console.log(this.source);
    console.log(this.source);
    console.log(this.target);
    console.log(this.dropZonesMap);
    if (this.target.type === 'dropZone' && this.source.type === 'tool') {
      console.log(this.dropZonesMap.get(this.target.el));
      const { r, c } = this.dropZonesMap.get(this.target.el);
      console.log(r + '-' + c);
      // this.elConfigs[r][c].push(new DragEventConfig());
      let button = this.toolButtons.filter(
        btn => btn['id'] === this.inputFunctionType
      )[0];
      this.table.rows[this.selectedRow].cols[this.selectedCol].value.push(button.fn(...button.params));
      // console.log(this.table.rows[this.selectedRow].cols[this.selectedCol].value);
    } else if (this.source.type === 'element' && this.target.type === 'element') {
      if (this.source.parentDropZone === this.target.parentDropZone) {
        const { r, c } = this.dropZonesMap.get(this.target.parentDropZone);
        const srcID = this.elHTMLs[r][c].indexOf(this.source.el),
          tgtID = this.elHTMLs[r][c].indexOf(this.target.el);
        console.log(srcID + '~' + tgtID);
        console.log(this.pairs(srcID, tgtID));
        for (const [x, y] of this.pairs(srcID, tgtID)) {
          [this.table.rows[r].cols[c].value[x], this.table.rows[r].cols[c].value[y]] =
            [this.table.rows[r].cols[c].value[y], this.table.rows[r].cols[c].value[x]];
        }
      } else {

      }
    }
  }

  addElement(id) {
    console.log(this.selectedRow + "-" + this.selectedCol);
    let button = this.toolButtons.filter(
      btn => btn['id'] === id
    )[0];
    this.table.rows[this.selectedRow].cols[this.selectedCol].value.push(button.fn(...button.params));
  }

  getElementPosition(el) {
    return this.dropZonesMap.get(el.closest('.dropZone'));
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
    console.log(element);
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
  updateElement(data: any) {
    console.log(data);
    // console.log(element);
    // console.log(pos);
    // let r, c, i;
    // [r, c, i] = pos.split('-');
    // console.log(this.table.rows[r].cols[c].value);
    // this.table.rows[r].cols[c].value[i] = element;
  }

  deleteElement(pos) {
    let r, c, i;
    [r, c, i] = pos.split('-');
    // console.log(r,c,i);
    this.table.rows[r].cols[c].value.splice(i, 1);
  }

  renderForm() {
    this.formBuild.getForm();
    setTimeout(() => {
      // console.log(this.formBuild.table);
      this.formRender.table = this.formBuild.table;
      this.table = this.formBuild.table;
      this.modalOpen = true;
    }, 200);
  }
  closeForm() {
    this.formBuild.getForm();
    let form: any, tags = '';
    setTimeout(() => {
      console.log(this.formBuild.table);
      form = this.formBuild.table;
      this.table = form;
      // if (this.formTag.value !== null || this.formTag.value !== undefined) {
      //   tags = this.formTag.value.split(' ');
      // }
      let request = {
        requestId: this.formBuild.requestId,
        format: form,
        title: this.formTitle.value,
        tags: this.tags
      };
      console.log(request);
      this.http.addTemplates(request)
        .subscribe(
        (response: any) => {
          console.log(response);
          if(response.status === "SUCCESS"){
            this.formBuild.templateId = response.templateId;
            this.router.navigateByUrl(this.formBuild.route);
          }
        }
        );
    }, 200);
  }
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: any): void {
    let index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
