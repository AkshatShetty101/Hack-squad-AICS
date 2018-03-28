import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminDashboardRepositoryComponent } from './admin/admin-dashboard/admin-dashboard-repository/admin-dashboard-repository.component';
import { AdminDashboardVerificationsComponent } from './admin/admin-dashboard/admin-dashboard-verifications/admin-dashboard-verifications.component';
import { AdminDashboardRequestsComponent } from './admin/admin-dashboard/admin-dashboard-requests/admin-dashboard-requests.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTrackingComponent } from './admin/admin-tracking/admin-tracking.component';
import { GcComponent } from './gc/gc.component';
import { UserComponent } from './user/user.component';
import { RaDashboardComponent } from './ra/ra-dashboard/ra-dashboard.component';
import { RaMakeRequestComponent } from './ra/ra-dashboard/ra-make-request/ra-make-request.component';
import { TrackRequestComponent } from './ra/ra-dashboard/track-request/track-request.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      {
        path: 'dashboard', component: AdminDashboardComponent, children: [
          { path: 'request', component: AdminDashboardRequestsComponent },
          { path: 'verification', component: AdminDashboardVerificationsComponent },
          { path: 'repository', component: AdminDashboardRepositoryComponent },
          { path: 'tracking', component: AdminTrackingComponent },
          { path: '', redirectTo: 'request', pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'gc', component: GcComponent, children: [

    ]
  },
  {
    path: 'ra', component: GcComponent, children: [
      {
        path: 'dashboard', component: RaDashboardComponent, children: [
          { path: 'makeRequest', component: RaMakeRequestComponent },
          { path: 'trackRequest', component: TrackRequestComponent },
          { path: '', redirectTo: 'request', pathMatch: 'full' }
        ]
      }
    ]
  },
  {
    path: 'user', component: UserComponent, children: [

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
