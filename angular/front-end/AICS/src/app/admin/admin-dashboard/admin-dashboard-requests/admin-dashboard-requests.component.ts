<<<<<<< HEAD
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component,Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
import { FormBuildService } from '../../../form-builder/form-build.service';
import { Router } from '@angular/router';

>>>>>>> 56e5219861500c0f0f9fca4600d66482eebd4dd9
@Component({
  selector: 'app-admin-dashboard-requests',
  templateUrl: './admin-dashboard-requests.component.html',
  styleUrls: ['./admin-dashboard-requests.component.scss']
})
export class AdminDashboardRequestsComponent implements OnInit, AfterViewInit {
  requestToLoad: { id: string, title: string, data: string } = { id: 'default', title: 'default', data: 'default' };
<<<<<<< HEAD
  test:number;
  constructor(private change:ChangeDetectorRef) { }

  ngOnInit() { 
    this.requestToLoad = { id: 'default', title: 'default', data: 'default' };        
=======
  table: any;
  constructor(
    private formBuild: FormBuildService,
    private router: Router
  ) { }

  ngOnInit() {
>>>>>>> 56e5219861500c0f0f9fca4600d66482eebd4dd9
  }

  previewIt(request: { id: string, title: string, data: string }) {
    console.log('GOt some shiz!!');
    console.log(request);
    this.test++;
    this.requestToLoad = request; 
    console.log(this.requestToLoad);
    this.change.detectChanges();
  }

  ngAfterViewInit(){
    console.log('change detected!!');
    this.requestToLoad = { id: 'default', title: 'default', data: 'default' };    
  }
  clearIt(){
    this.change.detectChanges();
    // this.requestToLoad = { id: 'default', title: 'default', data: 'default' };
    console.log('cleared');
  }
  openBuilder(){
    this.formBuild.initForm();
    this.router.navigateByUrl('/formBuilder');
  }
}
