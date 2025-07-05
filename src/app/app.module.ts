import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { LayoutComponent } from './layout/layout.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { AddOrganizationDialogComponent } from './owner/organization/add-organization-dialog/add-organization-dialog.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { DropdownModule } from 'primeng/dropdown';              // ← import this


@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, LayoutComponent, AddOrganizationDialogComponent, OwnerDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    TableModule
  ],
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
