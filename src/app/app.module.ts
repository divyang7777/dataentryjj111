import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatGridListModule,
  MatListModule,
  MatRadioModule,
  MatDividerModule,
  // MatStepperModule,
  MatInputModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { DataFormComponent, PasswordComponent } from './data-form/data-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminPanalComponent } from './admin-panal/admin-panal.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CdkTableModule } from '@angular/cdk/table';

const appRoutes: Routes = [
  { path: 'admin-panal', component: AdminPanalComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: DataFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DataFormComponent,
    PasswordComponent,
    AdminPanalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatRadioModule,
    MatGridListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    NgxSpinnerModule,
    MatCardModule,
    // MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    CdkTableModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [PasswordComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
