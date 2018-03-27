import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-verify',
  templateUrl: './admin-verify.component.html',
  styleUrls: ['./admin-verify.component.scss']
})
export class AdminVerifyComponent implements OnInit {
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
