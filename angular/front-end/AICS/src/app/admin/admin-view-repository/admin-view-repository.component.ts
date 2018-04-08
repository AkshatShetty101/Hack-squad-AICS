import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view-repository',
  templateUrl: './admin-view-repository.component.html',
  styleUrls: ['./admin-view-repository.component.scss']
})
export class AdminViewRepositoryComponent implements OnInit {
  formList: any[] = [];
  divisionList: string[] = [];
  selectedDivision: string = 'all';
  constructor() { }

  ngOnInit() {
    this.formList = [
    { id: '2323', division: 'A', title: 'A_A', deadline: 1 },
    { id: '2323', division: 'A', title: 'A_A', deadline: 1 },
    { id: '2323', division: 'B', title: 'A_dsa', deadline: 1 },
    { id: '2323', division: 'A', title: 'A_A', deadline: 1 },
    { id: '2323', division: 'C', title: 'A_ads', deadline: 1 },
    { id: '2323', division: 'B', title: 'A_A', deadline: 1 },
    { id: '2323', division: 'C', title: 'A_A', deadline: 1 },
    { id: '2323', division: 'A', title: 'A_32', deadline: 1 },
    { id: '2323', division: 'C', title: 'A_A', deadline: 1 },
    { id: '2323', division: 'A', title: 'A_A', deadline: 1 }
    ];
    for(let i=0; i < this.formList.length; i++){
      if(this.divisionList.indexOf(this.formList[i].division) === -1){
        this.divisionList.push(this.formList[i].division);
      }
    }
  }
  getFormList() {
    return this.formList.filter((x) => {
      if(this.selectedDivision === 'all'){
        return true;
      }
      else{
        return x.division === this.selectedDivision;
      }
    });
  }
}
