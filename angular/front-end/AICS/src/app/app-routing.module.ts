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
import { AdminViewFormsComponent } from './admin/admin-view-forms/admin-view-forms.component';
import { AdminViewRepositoryComponent } from './admin/admin-view-repository/admin-view-repository.component';
import { RaDashboardComponent } from './ra/ra-dashboard/ra-dashboard.component';
import { RaMakeRequestComponent } from './ra/ra-dashboard/ra-make-request/ra-make-request.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormRendererComponent } from './form-renderer/form-renderer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'formBuilder', component: FormBuilderComponent },
  { path: 'formRenderer', component: FormRendererComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'tracking', component: AdminTrackingComponent },
      { path: 'view_forms', component: AdminViewFormsComponent },
      { path: 'view_repository', component: AdminViewRepositoryComponent },
      {
        path: 'dashboard', component: AdminDashboardComponent, children: [
          { path: 'request', component: AdminDashboardRequestsComponent },
          { path: 'verification', component: AdminDashboardVerificationsComponent },
          { path: 'repository', component: AdminDashboardRepositoryComponent },
          { path: '', pathMatch: 'full', redirectTo: 'request' }
        ]
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  {
    path: 'gc', component: GcComponent, children: []
  },
  {
    path: 'user', component: UserComponent, children: []
  },
  {
    path: 'requesting_authority', component: AdminComponent, children: [
      {
        path: 'dashboard', component: RaDashboardComponent, children: [
          { path: 'make_request', component: RaMakeRequestComponent },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
