import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-tracking',
  templateUrl: './admin-tracking.component.html',
  styleUrls: ['./admin-tracking.component.scss']
})
export class AdminTrackingComponent implements OnInit {
  formList: { id: string; }[] = [{ id: '5ab08e28ecf6d91e5e1de9a2' },
  { id: '5ab08e28ecf6d91e5e1de9a2' },
  { id: '5ab08e28ecf6d91e5e1de9a2' },
  { id: '5ab08e28ecf6d91e5e1de9a2' },
  { id: '5ab08e28ecf6d91e5e1de9a2' },
  { id: '5ab08e28ecf6d91e5e1de9a2' },
  { id: '5ab08e28ecf6d91e5e1de9a2' },
  { id: '5ab08e28ecf6d91e5e1de9a2' },
  { id: '5ab08e28ecf6d91e5e1de9a2' }];
  constructor() { }

  ngOnInit() {
  }

}
