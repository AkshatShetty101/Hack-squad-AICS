import { Component, OnInit, Input } from '@angular/core';
import { FormRenderService } from '../../../form-renderer/form-render.service';

@Component({
  selector: 'app-admin-view-box',
  templateUrl: './admin-view-box.component.html',
  styleUrls: ['./admin-view-box.component.scss']
})
export class AdminViewBoxComponent implements OnInit {
  @Input()cl: string;
  // @Input()form:{ id: string, title: string, division: string, deadline: number };
  @Input()form:any;
  modalOpen: boolean = false;
  constructor(
    private formRender: FormRenderService
  ) { }

  ngOnInit() {
    // Initialize the table of formRender
    // this.formRender.table = this.data;
  }

}
