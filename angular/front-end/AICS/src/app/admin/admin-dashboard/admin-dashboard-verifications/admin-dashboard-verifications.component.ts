import { Component, OnInit } from '@angular/core';
import { IndexDBService } from '../../../shared/services/indexdb.service';

@Component({
  selector: 'app-admin-dashboard-verifications',
  templateUrl: './admin-dashboard-verifications.component.html',
  styleUrls: ['./admin-dashboard-verifications.component.scss']
})
export class AdminDashboardVerificationsComponent implements OnInit {

  constructor(private IndexDB: IndexDBService) { }
  requestToLoad: { id: string} = { id: "default"};
  ngOnInit() {
    console.log('from here!!!!');
  }
  previewIt(request: { id: string}) {
    this.requestToLoad = request;
  }
   // Pie
   public pieChartLabels: string[] = ['Beyond Deadline', 'Within a week', 'Beyond a week'];
   public pieChartColors: any[] = [
     { backgroundColor: ['#d50303', '#ffd52b', '#023611'] }
   ];
   public pieChartData: number[] = [300, 500, 300];
   public pieChartType: string = 'pie';
 
   // events
   public chartClicked(e: any): void {
     console.log(e);
   }
 
   public chartHovered(e: any): void {
     console.log(e);
   }
}
