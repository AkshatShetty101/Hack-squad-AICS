import { Component, OnInit, Input } from '@angular/core';
import { GraphQLService } from '../../shared/services/graphql.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {
  @Input() id:string;
  @Input() formId:string
  heading:{title:string,subtitle:string,description:string};
  data:{by:string,message:string,timestamp:string}[];
  myForm: FormGroup = new FormGroup({
    "data": new FormControl(null, [Validators.required])
  });
  
  constructor(private graphqlService:GraphQLService) { }
  ngOnInit() {
    console.log('stuff');
    let d = this.graphqlService.loadIssueDetails(this.id)
    .subscribe((data: any) => {
      console.log(data.data.issueTrackerById);
      this.heading = data.data.issueTrackerById.heading;
      this.data = data.data.issueTrackerById.data;
    }, (error) => {
      console.log(error);
    });
  }

  addComment(){
    
  }
}
