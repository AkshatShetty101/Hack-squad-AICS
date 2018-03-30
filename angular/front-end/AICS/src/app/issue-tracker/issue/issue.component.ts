import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  @Input() issue: { _id: string, title: string, tags: string[], user: string, status: string, comments: number };
  @Output() passId = new EventEmitter<{ _id: string }>();
  constructor() { }

  ngOnInit() {
  }
  load() {
    console.log('here!!');
    this.passId.emit({ _id: this.issue._id });
    //Go to issue details page
  }
}
