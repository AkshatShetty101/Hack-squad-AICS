import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue-tracker',
  templateUrl: './issue-tracker.component.html',
  styleUrls: ['./issue-tracker.component.scss']
})
export class IssueTrackerComponent implements OnInit {
  issueList: { _id: string, title: string, tags: string[], user: string, status: string, comments: number }[];
  form: { name: string, id: string };
  issueToLoadId: string;
  constructor() { }

  ngOnInit() {
    this.form = {name:"Shitty form",id:"123124234"}
      this.issueList = [{ _id: "5abdb97dd14ca9568f35cb31", title: "Some shitty doubt", tags: ['doubt', 'incorrect template', 'insufficient data'], user: "Akshat Shetty", status: "closed", comments: 2 },
      { _id: "5abdb97dd14ca9568f35cb31", title: "Some shitty doubt", tags: ['doubt', 'incorrect template', 'insufficient data'], user: "Akshat Shetty", status: "closed", comments: 2 },
      { _id: "5abdb97dd14ca9568f35cb31", title: "Some shitty doubt", tags: ['doubt', 'incorrect template', 'insufficient data'], user: "Akshat Shetty", status: "closed", comments: 2 }];
  }
  loadDetails(data) {
    console.log('outside!');
    this.issueToLoadId = data._id;
  }
}
