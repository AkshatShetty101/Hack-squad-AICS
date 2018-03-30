import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view-forms',
  templateUrl: './admin-view-forms.component.html',
  styleUrls: ['./admin-view-forms.component.scss']
})
export class AdminViewFormsComponent implements OnInit {
  constructor() {

  }
  statusCode: number = 0;
  formList: { id: string, title: string, division: string, deadline: number }[];
  ngOnInit() {
    //Load data here !!!
    this.formList = [{ id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 3 },
    { id: "2323", division: "A", title: "A_A", deadline: 1 },
    { id: "2323", division: "A", title: "A_A", deadline: 2 }]
  }

  findSpecific(data: number) {
    console.log(data);
    this.statusCode = data;
  }

  getFormList() {
    return this.formList.filter((x) => {
      if (this.statusCode === 0 || this.statusCode === x.deadline) {
        return true;
      } else {
        return false;
      }
    })
  }
}
