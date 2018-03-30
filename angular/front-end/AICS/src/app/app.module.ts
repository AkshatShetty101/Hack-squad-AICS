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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpService } from './shared/services/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
// import { AngularIndexedDB } from 'angular2-indexeddb';
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

import { IndexDBService } from './shared/services/indexdb.service';
import { AdminVerificationsListComponent } from './admin/admin-dashboard/admin-dashboard-verifications/admin-verifications-list/admin-verifications-list.component';
import { AdminVerifyComponent } from './admin/admin-dashboard/admin-dashboard-verifications/admin-verifications-list/admin-verify/admin-verify.component'
import { AdminVerificationsPreviewComponent } from './admin/admin-dashboard/admin-dashboard-verifications/admin-verifications-preview/admin-verifications-preview.component';


import { AngularDraggableModule } from 'angular2-draggable';
import { DragDirective } from './shared/directives/drag.directive';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { RendererInputElementsComponent } from './form-renderer/renderer-input-elements/renderer-input-elements.component';
import { RendererHeaderElementsComponent } from './form-renderer/renderer-header-elements/renderer-header-elements.component';
import { RendererParagraphElementsComponent } from './form-renderer/renderer-paragraph-elements/renderer-paragraph-elements.component';
import { RendererTextareaElementsComponent } from './form-renderer/renderer-textarea-elements/renderer-textarea-elements.component';
import { RendererGroupElementsComponent } from './form-renderer/renderer-group-elements/renderer-group-elements.component';
import { FormRenderService } from './form-renderer/form-render.service';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { BuilderInputElementsComponent } from './form-builder/builder-input-elements/builder-input-elements.component';
import { BuilderGroupElementsComponent } from './form-builder/builder-group-elements/builder-group-elements.component';
import { BuilderHeaderElementsComponent } from './form-builder/builder-header-elements/builder-header-elements.component';
import { BuilderParagraphElementsComponent } from './form-builder/builder-paragraph-elements/builder-paragraph-elements.component';
import { FormBuildService } from './form-builder/form-build.service';
import { BuilderTextareaElementsComponent } from './form-builder/builder-textarea-elements/builder-textarea-elements.component';
import { BuilderSelectElementsComponent } from './form-builder/builder-select-elements/builder-select-elements.component';
import { RendererSelectElementsComponent } from './form-renderer/renderer-select-elements/renderer-select-elements.component';
import { RaComponent } from './ra/ra.component';
import { RaMakeRequestComponent } from './ra/ra-dashboard/ra-make-request/ra-make-request.component';
import { RaDashboardComponent } from './ra/ra-dashboard/ra-dashboard.component';
import { Ng4FilesModule } from './ng4-files';
import { TrackRequestComponent } from './ra/ra-dashboard/track-request/track-request.component';
import { RaRequestListComponent } from './ra/ra-dashboard/track-request/ra-request-list/ra-request-list.component';
import { RaRequestComponent } from './ra/ra-dashboard/track-request/ra-request-list/ra-request/ra-request.component';
import { RaRequestPreviewComponent } from './ra/ra-dashboard/track-request/ra-request-preview/ra-request-preview.component';
import { AdminFormComponent } from './admin/admin-view-repository/admin-form/admin-form.component';
import { MatIconModule, MatTabsModule } from '@angular/material';
import { MatButtonModule, MatRadioModule, MatCheckboxModule} from '@angular/material';
import { IssueTrackerComponent } from './issue-tracker/issue-tracker.component';
import { IssueComponent } from './issue-tracker/issue/issue.component';
import { IssueDetailsComponent } from './issue-tracker/issue-details/issue-details.component';
import { GraphQLService } from './shared/services/graphql.service';
import { HTTPInterceptor } from './shared/services/http.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    DragDirective,
    FormRendererComponent,
    RendererInputElementsComponent,
    RendererHeaderElementsComponent,
    RendererParagraphElementsComponent,
    RendererTextareaElementsComponent,
    RendererGroupElementsComponent,
    FormBuilderComponent,
    BuilderInputElementsComponent,
    BuilderGroupElementsComponent,
    BuilderHeaderElementsComponent,
    BuilderParagraphElementsComponent,
    BuilderTextareaElementsComponent,
    BuilderSelectElementsComponent,
    RendererSelectElementsComponent,
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
    AdminVerificationsPreviewComponent,
    AdminFormComponent,
    RaComponent,
    RaMakeRequestComponent,
    RaDashboardComponent,
    TrackRequestComponent,
    RaRequestListComponent,
    RaRequestComponent,
    RaRequestPreviewComponent,
    IssueTrackerComponent,
    IssueComponent,
    IssueDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularDraggableModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    Ng4FilesModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    // AngularIndexedDB,
    HttpModule,
    MatTabsModule,
    LocalStorageModule.withConfig({
      prefix: 'app',
      storageType: 'localStorage'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true },
    FormRenderService,
    FormBuildService,
    IndexDBService,
    HttpService,
    AuthService,
    GraphQLService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
