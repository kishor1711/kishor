import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './common/login/login.component';
import { TableOperationComponent } from './table/table-operation/table-operation.component';

import { EditableComponent } from '../app/editable/editable.component';
import { ViewModeDirective } from '../app/editable/view-mode.directive';
import { EditModeDirective } from '../app/editable/edit-mode.directive';
import { FocusableDirective } from './services/focusable.directive';
import { EditableOnEnterDirective } from '../app/editable/edit-on-enter.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    PageNotFoundComponent,
    LoginComponent,
    TableOperationComponent,
    EditableComponent, ViewModeDirective,
    EditModeDirective, FocusableDirective,
    EditableOnEnterDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
