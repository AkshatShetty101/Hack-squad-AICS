import { Component, OnInit } from '@angular/core';
import { FormBuildService } from '../../../form-builder/form-build.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-requests',
  templateUrl: './admin-dashboard-requests.component.html',
  styleUrls: ['./admin-dashboard-requests.component.scss']
})
export class AdminDashboardRequestsComponent implements OnInit {
  requestToLoad: { id: string, title: string, data: string } = { id: 'default', title: 'default', data: 'default' };
  table: any;
  constructor(
    private formBuild: FormBuildService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  previewIt(request: { id: string, title: string, data: string }) {
    this.requestToLoad = request;
  }
  openBuilder(){
    this.formBuild.initForm();
    this.router.navigateByUrl('/formBuilder');
  }
}
