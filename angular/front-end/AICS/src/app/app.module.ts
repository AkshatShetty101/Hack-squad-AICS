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
import { AngularIndexedDB } from 'angular2-indexeddb';
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
import { AdminViewFormsComponent } from './admin/admin-view-forms/admin-view-forms.component';
import { AdminViewRepositoryComponent } from './admin/admin-view-repository/admin-view-repository.component';
import { AdminViewBoxComponent } from './admin/admin-view-forms/admin-view-box/admin-view-box.component';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IndexDBService } from './shared/services/indexdb.service';
import { AdminVerificationsListComponent } from './admin/admin-dashboard/admin-dashboard-verifications/admin-verifications-list/admin-verifications-list.component';
import { AdminVerifyComponent } from './admin/admin-dashboard/admin-dashboard-verifications/admin-verifications-list/admin-verify/admin-verify.component'
import { AdminVerificationsPreviewComponent } from './admin/admin-dashboard/admin-dashboard-verifications/admin-verifications-preview/admin-verifications-preview.component';

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
    AdminRequestComponent,
    AdminViewFormsComponent,
    AdminViewRepositoryComponent,
    AdminViewBoxComponent,
    AdminVerificationsListComponent,
    AdminVerifyComponent,
    AdminVerificationsPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    HttpClientModule,
    // AngularIndexedDB,
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'app',
      storageType: 'localStorage'
    }),
    BrowserAnimationsModule,
    CalendarModule.forRoot()
  ],
  providers: [
    IndexDBService,
    HttpService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
