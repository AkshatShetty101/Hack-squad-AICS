import { Component, OnInit, Input } from '@angular/core';
import { FormRenderService } from '../../../form-renderer/form-render.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {
  forms: any[];
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
  @Input() id;
  @Input() title;
  @Input() division;
  @Input() deadline;
  constructor(
    private formRender: FormRenderService
  ) { }

  ngOnInit() {
    this.formRender.elements = this.data;
  }

}
