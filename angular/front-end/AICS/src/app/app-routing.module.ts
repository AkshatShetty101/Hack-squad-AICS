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
<<<<<<< HEAD
import { AdminViewFormsComponent } from './admin/admin-view-forms/admin-view-forms.component';
import { AdminViewRepositoryComponent } from './admin/admin-view-repository/admin-view-repository.component';
import { RaDashboardComponent } from './ra/ra-dashboard/ra-dashboard.component';
import { RaMakeRequestComponent } from './ra/ra-dashboard/ra-make-request/ra-make-request.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, children: [
    { path: 'tracking', component: AdminTrackingComponent },
    { path: 'view_forms', component: AdminViewFormsComponent },
    { path: 'view_repository', component: AdminViewRepositoryComponent },
    { path: 'dashboard', component: AdminDashboardComponent, children: [
      { path: 'request', component: AdminDashboardRequestsComponent },
      { path: 'verification', component: AdminDashboardVerificationsComponent },
      { path: 'repository', component: AdminDashboardRepositoryComponent },
      { path: '', pathMatch: 'full', redirectTo: 'request' }
    ]},
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
  ]},
  { path: 'gc', component: GcComponent, children: [

  ]},
  { path: 'user', component: UserComponent, children: [

  ]},
  { path: 'requesting_authority', component: AdminComponent, children: [
    { path: 'dashboard', component: RaDashboardComponent, children: [
      { path: 'make_request', component: RaMakeRequestComponent },
    ]},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  ]},
  { path: '**', component: AppComponent},
=======
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
>>>>>>> 55076a883d375f5c3f869eeb2a6878364c7b728b
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
