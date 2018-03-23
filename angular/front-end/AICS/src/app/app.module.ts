import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackingComponent } from './tracking/tracking.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './shared/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LocalStorageModule} from 'angular-2-local-storage';
import { AuthService } from './shared/services/auth.service';
import { DashboardRequestsComponent } from './dashboard/dashboard-requests/dashboard-requests.component';
import { DashboardVerificationsComponent } from './dashboard/dashboard-verifications/dashboard-verifications.component';
import { DashboardRepositoryComponent } from './dashboard/dashboard-repository/dashboard-repository.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TrackingComponent,
    NavbarComponent,
    LoginComponent,
    DashboardRequestsComponent,
    DashboardVerificationsComponent,
    DashboardRepositoryComponent
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
