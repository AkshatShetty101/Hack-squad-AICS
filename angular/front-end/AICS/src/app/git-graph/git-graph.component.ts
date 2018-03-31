import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ChartServiceService } from '../chart-service.service';

@Component({
  selector: 'app-git-graph',
  templateUrl: './git-graph.component.html',
  styleUrls: ['./git-graph.component.scss']
})
export class GitGraphComponent implements OnInit, OnChanges {
  // @Input() inputJson: any[];
  elementName: string;
  sampleJson: any[];
  constructor(
    private chartService: ChartServiceService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit() {
    this.elementName = 'gitGraph';
    this.sampleJson = [
      {
        'person': 'Akshat',
        'personType': 'Requesting Authority',
        'newHolder': 'Akshat',
        'newHolderType': 'Requesting Authority',
        'type': 'Start'
      },
      {
        'person': 'Akshat',
        'personType': 'Requesting Authority',
        'newHolder': 'Akshat',
        'newHolderType': 'Admin',
        'type': 'Request for Form'
      },
      {
        'person': 'Akshat',
        'personType': 'Admin',
        'newHolder': 'Akshat',
        'newHolderType': 'Admin',
        'type': 'Template Created'
      },
      {
        'person': 'Admin',
        'personType': 'Admin',
        'newHolder': 'Akshat',
        'newHolderType': 'Admin',
        'type': 'Template Edited'
      },
      {
        'person': 'Akshat',
        'personType': 'Admin',
        'newHolder': 'Akshat',
        'newHolderType': 'Requesting Authority',
        'type': 'Template Submitted'
      },
      {
        'person': 'Akshat',
        'personType': 'Requesting Authority',
        'newHolder': 'Akshat',
        'newHolderType': 'Admin',
        'type': 'Template Approved'
      },
      {
        'person': 'Akshat',
        'personType': 'Admin',
        'newHolder': 'Akshat',
        'newHolderType': 'Admin',
        'type': 'Form Created'
      },
      {
        'person': 'Akshat',
        'personType': 'Admin',
        'newHolder': 'Akshat',
        'newHolderType': 'Group Coordinator',
        'type': 'Assigned'
      },
      {
        'person': 'Akshat',
        'personType': 'Group Coordinator',
        'newHolder': 'Akshat',
        'newHolderType': 'User',
        'type': 'Assigned to user'
      },
      {
        'person': 'Akshat',
        'personType': 'User',
        'newHolder': 'Akshat',
        'newHolderType': 'User',
        'type': 'Form Edit'
      },
      {
        'person': 'Akshat',
        'personType': 'User',
        'newHolder': 'Akshat',
        'newHolderType': 'Group Coordinator',
        'type': 'Group Coordinator Verification'
      },
      {
        'person': 'Akshat',
        'personType': 'Group Coordinator',
        'newHolder': 'Akshat',
        'newHolderType': 'Admin',
        'type': 'Group Coordinator Approved'
      },
      {
        'person': 'Akshat',
        'personType': 'Admin',
        'newHolder': 'Akshat',
        'newHolderType': 'Requesting Authority',
        'type': 'Admin Approved'
      },
      {
        'person': 'Akshat',
        'personType': 'Requesting Authority',
        'newHolder': 'Akshat',
        'newHolderType': 'Requesting Authority',
        'type': 'Complete'
      },
    ];
    this.chartService.buildEventChart(this.sampleJson);

  }
  ngOnChanges() {
  }
  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 1000 });
  }

}
