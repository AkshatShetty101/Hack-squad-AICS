import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ChartServiceService } from '../chart-service.service';

@Component({
  selector: 'app-git-graph',
  templateUrl: './git-graph.component.html',
  styleUrls: ['./git-graph.component.scss']
})
export class GitGraphComponent implements OnInit {
  @Input() inputJson: any[];
  elementName : string;
  sampleJson : any[];
  constructor(
    private chartService: ChartServiceService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit(){
    this.elementName = "gitGraph";
  //   this.sampleJson= [{
  //     "person":"Akshat",
  //     "personType":"ra",
  //     "newHolder":"Akshat",
  //     "newHolderType":"ra",
  //     "type":"Reg Authority Request"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"ra",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"admin",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"admin",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"gc",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"gc",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"user",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"user",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"user",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"user",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"gc",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"gc",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"user",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"user",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"user",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"user",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"gc",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"gc",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"admin",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"admin",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"gc",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"gc",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"user",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"user",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"user",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"user",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"gc",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"gc",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"admin",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"admin",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"ra",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"ra",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"ra",
  //     "type":"New Test"
  //   },
  //   {
  //     "person":"Akshat",
  //     "personType":"ra",
  //     "newHolder":"Sarvesh",
  //     "newHolderType":"admin",
  //     "type":"New Test"
  //   },
    
  // ]
  }
  ngOnChanges(){
    this.chartService.buildEventChart(this.sampleJson);
  }
  public openSnackBar(message:string) {
    this.snackBar.open(message,"Close",{duration:1000});
  }

}
