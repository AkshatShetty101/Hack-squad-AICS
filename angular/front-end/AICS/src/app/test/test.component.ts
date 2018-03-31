import { Component, OnInit } from '@angular/core';
import { ChartServiceService } from '../chart-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  elementName : string;
  sampleJson : any[];
  constructor(
    private chartService: ChartServiceService
  ) { }
  ngOnInit(){
    this.elementName = "gitGraph";
    
    console.log("Worked");
    this.sampleJson= [{
      "person":"Akshat",
      "personType":"ra",
      "newHolder":"Akshat",
      "newHolderType":"ra",
      "type":"Reg Authority Request"
    },
    {
      "person":"Akshat",
      "personType":"ra",
      "newHolder":"Sarvesh",
      "newHolderType":"ra",
      "type":"New Test"
    },
    {
      "person":"Akshat",
      "personType":"ra",
      "newHolder":"Sarvesh",
      "newHolderType":"admin",
      "type":"New Test"
    }
  ]
  this.chartService.buildEventChart(this.sampleJson);
  }
  ngAfterInit() {
  
  }

}
