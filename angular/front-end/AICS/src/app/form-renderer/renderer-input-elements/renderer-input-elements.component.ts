import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormRenderService } from '../form-render.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs/Subject';
import { Ng4FilesStatus, Ng4FilesSelected } from '../../ng4-files';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-renderer-input-elements',
  templateUrl: './renderer-input-elements.component.html',
  styleUrls: ['./renderer-input-elements.component.css']
})
export class RendererInputElementsComponent implements OnInit {
  @Input() eclass;
  @Input() subtype;
  @Input() label;
  @Input() placeholder;
  @Input() value;
  @Input() maxlength;
  @Input() max;
  @Input() min;
  @Input() required;
  @Input() touched;
  @Input() pristine;
  @Input() valid;
  @Input() pos;

  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/api/video', itemAlias: 'video'});
  public selectedFiles: any;
  valueField: FormControl = new FormControl();
  constructor(
    private formRender: FormRenderService
  ) { }

  ngOnInit() {
    this.formRender.formSubject.subscribe(
      (event) => {
        this.sendElement();
      }
    );
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item: any, response: any, status1: any, headers: any) => {
    //   console.log(item, response, status1, headers);
    //   console.log(item);
    //   console.log(response);
    //   console.log(status1);
    //   console.log(headers);
    // };
  }
  upload() {
    // this.uploader.queue[0].upload();
    console.log(this.uploader.queue);
  }
  public filesSelect(selectedFiles: Ng4FilesSelected): void {
    console.log(selectedFiles);
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
      // Hnadle error statuses here
    }
    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
    console.log(selectedFiles.files);
    this.value = selectedFiles.files[0];
  }
  sendElement() {
    this.touched = this.valueField.touched;
    this.pristine = this.valueField.pristine;
    this.valid = this.valueField.valid;
    if (this.subtype === 'text') {
      if (this.valueField.value === null || this.valueField.value === ''
        || this.valueField.value.length > this.maxlength) {
        this.valid = 'false';
      }
    } else
    if (this.subtype === 'number') {
      if (this.valueField.value === null || this.valueField.value === '' ||
        this.valueField.value > this.max || this.valueField.value < this.min) {
        this.valid = 'false';
      }
    } else
    if (this.subtype === 'date') {
      if (this.valueField.value === null || this.valueField.value === '') {
        this.valid = 'false';
      }
    } else {
    if (this.valueField.value === null) {
        this.valid = 'false';
      }
    }
    const element = this.getElement();
    this.formRender.updateForm(element, this.pos);
  }
  getElement() {
    let element: {};
    if(this.subtype === 'file'){
      element = {
        'type': 'input',
        'subtype': this.subtype,
        'class': this.eclass,
        'label': this.label,
        'placeholder': this.placeholder,
        'maxlength': this.maxlength,
        'max': this.max,
        'min': this.min,
        'required': this.required,
        'value': this.value,
        'valid': this.valid,
        'touched': this.touched,
        'pristine': this.pristine
      }; 
    }
    else{
      element = {
        'type': 'input',
        'subtype': this.subtype,
        'class': this.eclass,
        'label': this.label,
        'placeholder': this.placeholder,
        'maxlength': this.maxlength,
        'max': this.max,
        'min': this.min,
        'required': this.required,
        'value': this.valueField.value,
        'valid': this.valid,
        'touched': this.touched,
        'pristine': this.pristine
      };
    }
    return element;
  }
  download(file){
    console.log(file);
    let blob = new Blob([file], {type: file.type});
    let filename = file.name;
    saveAs(blob, filename);
  }
}
