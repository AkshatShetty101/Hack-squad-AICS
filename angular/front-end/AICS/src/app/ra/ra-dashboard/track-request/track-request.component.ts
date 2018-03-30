import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-request',
  templateUrl: './track-request.component.html',
  styleUrls: ['./track-request.component.scss']
})
export class TrackRequestComponent implements OnInit {

  constructor(
    private router: Router
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
    this.router.navigate(['/requesting_authority/dashboard/make_request'],{queryParams:{id:this.requestToLoad.id}})  ;
  }
}
