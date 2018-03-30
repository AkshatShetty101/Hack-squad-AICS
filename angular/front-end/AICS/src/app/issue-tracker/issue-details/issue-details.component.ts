import { Component, OnInit, Input } from '@angular/core';
import { GraphQLService } from '../../shared/services/graphql.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {
  @Input() id:string;
  constructor(private graphqlService:GraphQLService) { }
  ngOnInit() {
    console.log('stuff');
    this.graphqlService.loadIssueDetails(this.id);
  }

}
