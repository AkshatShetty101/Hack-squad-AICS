import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRepositoryComponent } from './dashboard/dashboard-repository/dashboard-repository.component';
import { DashboardVerificationsComponent } from './dashboard/dashboard-verifications/dashboard-verifications.component';
import { DashboardRequestsComponent } from './dashboard/dashboard-requests/dashboard-requests.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'home', component: NavbarComponent, children: [
    { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'request', component: DashboardRequestsComponent },
      { path: 'verification', component: DashboardVerificationsComponent },
      { path: 'repository', component: DashboardRepositoryComponent },
      { path: '', redirectTo: 'request', pathMatch: 'full'}
    ]},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  ]},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
