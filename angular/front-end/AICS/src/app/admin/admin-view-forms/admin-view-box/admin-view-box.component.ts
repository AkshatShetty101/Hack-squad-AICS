import { Component, OnInit, Input } from '@angular/core';
import { FormRenderService } from '../../../form-renderer/form-render.service';

@Component({
  selector: 'app-admin-view-box',
  templateUrl: './admin-view-box.component.html',
  styleUrls: ['./admin-view-box.component.scss']
})
export class AdminViewBoxComponent implements OnInit {
  @Input()cl: string;
  @Input()form:{ id: string, title: string, division: string, deadline: number };
  modalOpen: boolean = false;
  data: any[] = [
    {
      'type': 'input',
      'subtype': 'date',
      'class': '',
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
    },
    {
      'type': 'input',
      'subtype': 'text',
      'class': '',
      'label': 'Text Field',
      'value': '',
      'required': 'required',
      'placeholder': 'Enter text...',
      'maxlength': '10',
      'max': '',
      'min': '',
      'valid': 'false',
      'pristine': 'true',
      'touched': 'false'
    },
    {
      'class': '',
      'label': 'Header',
      'subtype': 'h1',
      'type': 'header'
    },
    {
      'type': 'input',
      'subtype': 'file',
      'class': '',
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
    },
    {
      'type': 'input',
      'subtype': 'number',
      'class': '',
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
    },
    {
      'type': 'group',
      'subtype': 'radio',
      'class': '',
      'value': 'option1',
      'required': 'false',
      'options': [{ 'label': 'option1', 'value': 'option1' }, { 'label': 'option2', 'value': 'option2' }],
      'valid': 'false',
      'pristine': 'true',
      'touched': 'false'
    },
    {
      'type': 'group',
      'subtype': 'checkbox',
      'class': '',
      'value': [],
      'required': 'false',
      'options': [{ 'label': 'option1', 'value': 'option1' },{ 'label': 'option2', 'value': 'option2'}],
      'valid': 'false',
      'pristine': 'true',
      'touched': 'false'
    },
    {
      'type': 'select',
      'subtype': '',
      'class': '',
      'value': 'option1',
      'required': 'false',
      'options': [{ 'label': 'option1', 'value': 'option1', 'selected': true },
       { 'label': 'option2', 'value': 'option2', 'selected': false }],
      'valid': 'false',
      'pristine': 'true',
      'touched': 'false'
    },
    {
      'type': 'paragraph',
      'class': '',
      'content': 'This is a paragraph...'
    },
    {
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
    }];
  constructor(
    private formRender: FormRenderService
  ) { }

  ngOnInit() {
    // this.formRender.elements = this.data;
  }

}
