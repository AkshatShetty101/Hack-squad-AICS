import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ra-request-preview',
  templateUrl: './ra-request-preview.component.html',
  styleUrls: ['./ra-request-preview.component.scss']
})
export class RaRequestPreviewComponent implements OnInit {
  @Input() data: { id: string, title: string, data: string } = { id: "default", data: "default", title: "default" };
  constructor() { }

  ngOnInit() {
  }

}
