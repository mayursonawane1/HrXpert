import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthInterceptor } from './core/auth.interceptor';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './common/layout/layout.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { AddOrganizationDialogComponent } from './owner/organization/add-organization-dialog/add-organization-dialog.component';
import { OwnerDashboardComponent } from './dashboards/owner-dashboard/owner-dashboard.component';
import { DropdownModule } from 'primeng/dropdown';              // ← import this
import { CardModule } from 'primeng/card';
import { ProfileOverlayComponent } from './common/profile-overlay/profile-overlay.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HrViewDialogComponent } from './owner/hr-view-dialog/hr-view-dialog.component';
import { LoaderInterceptor } from './core/laoder.interceptor';
import { FullscreenLoaderComponent } from './shared/components/fullscreen-loader/fullscreen-loader.component';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, LayoutComponent, ProfileOverlayComponent, FullscreenLoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    OverlayPanelModule,
    ToastModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    BrowserAnimationsModule,
    SidebarModule,  
    DialogModule,
    FormsModule,
    DropdownModule,
    TableModule,
    CardModule,
    PasswordModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
