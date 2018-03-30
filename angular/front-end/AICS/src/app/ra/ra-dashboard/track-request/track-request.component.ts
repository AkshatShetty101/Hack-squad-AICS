import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../shared/services/http.service';
import { GraphQLService } from '../../../shared/services/graphql.service';
import { IndexDBService } from '../../../shared/services/indexdb.service';

@Component({
  selector: 'app-track-request',
  templateUrl: './track-request.component.html',
  styleUrls: ['./track-request.component.scss']
})
export class TrackRequestComponent implements OnInit {

  constructor(
    private http: HttpService,
    private router: Router,
    private graphql: GraphQLService,
    private idb : IndexDBService
  ) { }
  requestToLoad: { id: string, title: string, data: string } = { id: "default", title: "default", data: "default" };
  ngOnInit() {
  }
  previewIt(request: { id: string, title: string, data: string, type: string }) {
    console.log(request);
    this.requestToLoad = request;
  }
  route() {
    console.log('here!');
    this.router.navigate(['/requesting_authority/dashboard/make_request'], { queryParams: { id: this.requestToLoad.id } });
  }

  approve() {
    this.graphql.loadTemplateIdFromRequestId(this.requestToLoad.id).subscribe((data)=>{
      console.log(data.data.reqFormById.template.template_id);
    this.http.approveTemplates({templateId:data.data.reqFormById.template.template_id}, 1).subscribe((data) => {
      console.log(data);
    },
      (err) => {
        console.log(err);
      });
    });
  }
}
