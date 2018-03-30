import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component,Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-admin-dashboard-requests',
  templateUrl: './admin-dashboard-requests.component.html',
  styleUrls: ['./admin-dashboard-requests.component.scss']
})
export class AdminDashboardRequestsComponent implements OnInit, AfterViewInit {
  requestToLoad: { id: string, title: string, data: string } = { id: 'default', title: 'default', data: 'default' };
  test:number;
  constructor(private change:ChangeDetectorRef) { }

  ngOnInit() { 
    this.requestToLoad = { id: 'default', title: 'default', data: 'default' };        
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
}
