import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {
  @Output() loadRequest = new EventEmitter<{ id: string }>();
  @Input() id: string = "default";
  @Input() type: string = "default";
  constructor() { }

  ngOnInit() {
  }

  loadIt() {
    this.loadRequest.emit({ id: this.id });
  }


}
