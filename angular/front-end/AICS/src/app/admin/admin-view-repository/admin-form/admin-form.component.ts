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
  @Input() id;
  @Input() title;
  @Input() division;
  @Input() deadline;
  constructor(
    private formRender: FormRenderService
  ) { }

  ngOnInit() {
    // Initialize formRender table
    // this.formRender.table = this.data;
  }

}
