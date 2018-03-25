import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DashboardRepositoryComponent } from './admin/dashboard/dashboard-repository/dashboard-repository.component';
import { DashboardVerificationsComponent } from './admin/dashboard/dashboard-verifications/dashboard-verifications.component';
import { DashboardRequestsComponent } from './admin/dashboard/dashboard-requests/dashboard-requests.component';
import { AdminComponent } from './admin/admin.component';
import { TrackingComponent } from './admin/tracking/tracking.component';
import { GcComponent } from './gc/gc.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'admin', component: AdminComponent, children: [
    { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'request', component: DashboardRequestsComponent },
      { path: 'verification', component: DashboardVerificationsComponent },
      { path: 'repository', component: DashboardRepositoryComponent },
      { path: 'tracking', component: TrackingComponent },
      { path: '', redirectTo: 'request', pathMatch: 'full'}
    ]},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  ]},
  { path: 'gc', component: GcComponent, children:[

  ]},
  { path: 'user', component: UserComponent, children:[

  ]},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
