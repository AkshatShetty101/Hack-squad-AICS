import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminTrackingComponent } from './admin/admin-tracking/admin-tracking.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './shared/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LocalStorageModule} from 'angular-2-local-storage';
import { AuthService } from './shared/services/auth.service';
import { AdminDashboardRequestsComponent } from './admin/admin-dashboard/admin-dashboard-requests/admin-dashboard-requests.component';
import { AdminDashboardVerificationsComponent } from './admin/admin-dashboard/admin-dashboard-verifications/admin-dashboard-verifications.component';
import { AdminDashboardRepositoryComponent } from './admin/admin-dashboard/admin-dashboard-repository/admin-dashboard-repository.component';
import { AdminFormBoxComponent } from './admin/admin-tracking/admin-form-box/admin-form-box.component';
import { GcComponent } from './gc/gc.component';
import { UserComponent } from './user/user.component';
import { AdminRequestListComponent } from './admin/admin-dashboard/admin-dashboard-requests/admin-request-list/admin-request-list.component';
import { AdminPreviewComponent } from './admin/admin-dashboard/admin-dashboard-requests/admin-preview/admin-preview.component';
import { AdminRequestComponent } from './admin/admin-dashboard/admin-dashboard-requests/admin-request-list/admin-request/admin-request.component';
import {MatTabsModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminTrackingComponent,
    AdminComponent,
    LoginComponent,
    AdminDashboardRequestsComponent,
    AdminDashboardVerificationsComponent,
    AdminDashboardRepositoryComponent,
    AdminFormBoxComponent,
    GcComponent,
    UserComponent,
    AdminRequestListComponent,
    AdminPreviewComponent,
    AdminRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MatTabsModule,
    LocalStorageModule.withConfig({
      prefix: '-app',
      storageType: 'localStorage'
    })
  ],
  providers: [
    HttpService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
