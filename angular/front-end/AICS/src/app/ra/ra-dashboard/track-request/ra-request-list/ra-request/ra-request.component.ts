import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-ra-request',
  templateUrl: './ra-request.component.html',
  styleUrls: ['./ra-request.component.scss']
})
export class RaRequestComponent implements OnInit {
  @Output() loadRequest = new EventEmitter<{ id: string }>();
  @Output() title:string = "default";
  @Input() id: string = "default";
  @Input() type: string = "default";
  @Input() cl:string;
  constructor() { }

  ngOnInit() {
    console.log(this.cl);
  }

  loadIt() {
    this.loadRequest.emit({ id: this.id });
  }

}
