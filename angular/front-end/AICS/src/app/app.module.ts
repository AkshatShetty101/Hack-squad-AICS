import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { TrackingComponent } from './admin/tracking/tracking.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './shared/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LocalStorageModule} from 'angular-2-local-storage';
import { AuthService } from './shared/services/auth.service';
import { DashboardRequestsComponent } from './admin/admin-dashboard/dashboard-requests/dashboard-requests.component';
import { DashboardVerificationsComponent } from './admin/admin-dashboard/dashboard-verifications/dashboard-verifications.component';
import { DashboardRepositoryComponent } from './admin/admin-dashboard/dashboard-repository/dashboard-repository.component';
import { FormBoxComponent } from './admin/tracking/form-box/form-box.component';
import { GcComponent } from './gc/gc.component';
import { UserComponent } from './user/user.component';
import { RequestListComponent } from './admin/admin-dashboard/dashboard-requests/request-list/request-list.component';
import { PreviewComponent } from './admin/admin-dashboard/dashboard-requests/preview/preview.component';
import { RequestComponent } from './admin/admin-dashboard/dashboard-requests/request-list/request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    TrackingComponent,
    AdminComponent,
    LoginComponent,
    DashboardRequestsComponent,
    DashboardVerificationsComponent,
    DashboardRepositoryComponent,
    FormBoxComponent,
    GcComponent,
    UserComponent,
    RequestListComponent,
    PreviewComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
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
