import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-admin-tracking',
  templateUrl: './admin-tracking.component.html',
  styleUrls: ['./admin-tracking.component.scss']
})
export class AdminTrackingComponent implements OnInit, OnChanges {
  formList: { id: string }[];
  form: { id: string, deadline: string };
  state: { status: string, bar_val: number, metadata: string } = { status: "default", bar_val: 0, metadata: "default" };
  date: Date;
  days_to_go: number;
  constructor() { }
  ngOnInit() {
    this.formList = [{ id: '5ab08e28ecf6d91e5e1de9a2' },
    { id: '5ab08e28ecf6d91e5e1' },
    { id: '5ab08e28ecf6d91e' },
    { id: '5ab08e28ecf6d91e5e1de9a2' },
    { id: '5ab08e28ecf6d91e5e1de9a2' },
    { id: '5ab086d91e5e1de9a2e28ecf' },
    { id: '5abde9a208e28ecf6d91e5e1' },
    { id: '5ab08e28ecf6d91e5e1de9aad22' },
    { id: '5ab08e28ecf6d91e5e1de9a2' }];
    this.form = { id: '5ab08e28ecf6d91e5e1de9a2', deadline: "2018-03-26T21:11:15.326Z" };
    this.state.status = "create";
    // this.state.metadata = "TO_USER";
    // this.state.metadata = "TO_ADMIN";
    this.state.metadata = " ";
    // this.state.metadata = "TO_RA";
    // this.state.metadata = "DONE";
    let now = new Date();
    this.date = new Date(this.form.deadline);
    switch (this.state.status) {
      case "create": {
        this.state.bar_val = 4;
        break;
      };
      case "edited": {
        console.log('here!');
        this.state.bar_val = 7;
        break;
      };
      case "assign": {
        if (this.state.metadata == "TO_GC")
          this.state.bar_val = 5;
        else
          this.state.bar_val = 6;
        break;
      };
      case "approve": {
        if (this.state.metadata == "DONE")
          this.state.bar_val = 11;
        break;
      };
      case "reject": {
        if (this.state.metadata == "TO_ADMIN")
          this.state.bar_val = 5;
        else
          this.state.bar_val = 6;
        break;
      };
      case "forfeit": {
        if (this.state.metadata == "TO_GC")
          this.state.bar_val = 5;
        else
          this.state.bar_val = 4;
        break;
      };
      case "submit": {
        if (this.state.metadata == "TO_GC")
          this.state.bar_val = 8;
        else if (this.state.metadata == "TO_ADMIN")
          this.state.bar_val = 9;
        else if (this.state.metadata == "TO_RA")
          this.state.bar_val = 10;
      };
    }
    this.state.bar_val=1;
    this.start();
    console.log(this.state);
  }

  ngOnChanges() {
    this.formList = [{ id: '5ab08e28ecf6d91e5e1de9a2' },
    { id: '5ab08e28ecf6d91e5e1' },
    { id: '5ab08e28ecf6d91e' },
    { id: '5ab08e28ecf6d91e5e1de9a2' },
    { id: '5ab08e28ecf6d91e5e1de9a2' },
    { id: '5ab086d91e5e1de9a2e28ecf' },
    { id: '5abde9a208e28ecf6d91e5e1' },
    { id: '5ab08e28ecf6d91e5e1de9aad22' },
    { id: '5ab08e28ecf6d91e5e1de9a2' }];
    this.form = { id: '5ab08e28ecf6d91e5e1de9a2', deadline: "2018-03-26T21:11:15.326Z" };
    this.state.status = "create";
    // this.state.metadata = "TO_USER";
    // this.state.metadata = "TO_ADMIN";
    this.state.metadata = " ";
    // this.state.metadata = "TO_RA";
    // this.state.metadata = "DONE";
    let now = new Date();
    this.date = new Date(this.form.deadline);
    switch (this.state.status) {
      case "create": {
        this.state.bar_val = 4;
        break;
      };
      case "edited": {
        console.log('here!');
        this.state.bar_val = 7;
        break;
      };
      case "assign": {
        if (this.state.metadata == "TO_GC")
          this.state.bar_val = 5;
        else
          this.state.bar_val = 6;
        break;
      };
      case "approve": {
        if (this.state.metadata == "DONE")
          this.state.bar_val = 11;
        break;
      };
      case "reject": {
        if (this.state.metadata == "TO_ADMIN")
          this.state.bar_val = 5;
        else
          this.state.bar_val = 6;
        break;
      };
      case "forfeit": {
        if (this.state.metadata == "TO_GC")
          this.state.bar_val = 5;
        else
          this.state.bar_val = 4;
        break;
      };
      case "submit": {
        if (this.state.metadata == "TO_GC")
          this.state.bar_val = 8;
        else if (this.state.metadata == "TO_ADMIN")
          this.state.bar_val = 9;
        else if (this.state.metadata == "TO_RA")
          this.state.bar_val = 10;
      };
    }
    console.log(this.state);
  }

  start() {
    let a = [1, 2, 3, 4, 5, 4, 5, 6,7,8,7,9,10,11];
    let i = 0;
    setInterval(() => {
      console.log(this.state);
      if(i!=a.length)
      this.state.bar_val = a[i]
      else
      this.state.bar_val = 11;
      i++;
    }, 2000);

  }
}

