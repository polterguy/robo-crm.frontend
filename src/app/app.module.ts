/*
 * Automatically generated by Magic
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgxImageCompressService } from 'ngx-image-compress';
import { A11yModule } from '@angular/cdk/a11y';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { MagicSelectorComponent } from './helpers/magic-selector/magic-selector.component';
import { MagicUsernameLookupComponent } from './helpers/magic-username-lookup/magic-username-lookup.component';
import { MagicAutocompleteComponent } from './helpers/magic-autocomplete/magic-autocomplete.component';
import { MagicFilterComponent } from './helpers/magic-filter/magic-filter.component';
import { MagicImageComponent } from './helpers/magic-image/magic-image.component';
import { MagicImageFieldComponent } from './helpers/magic-image-field/magic-image-field.component';
import { MagicImageViewComponent } from './helpers/magic-image-view/magic-image-view.component';
import { MagicFileViewComponent } from './helpers/magic-file-view/magic-file-view.component';
import { MagicFileComponent } from './helpers/magic-file/magic-file.component';
import { MagicFileFieldComponent } from './helpers/magic-file-field/magic-file-field.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '@env/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { FormatDatePipe } from './pipes/format-date-pipe';
import { ConfirmDialogComponent } from './confirm-deletion-dialog/confirm-dialog.component';
import { UserManagementComponent } from './common/user-management/user-management.component';
import { EditUserDialogComponent } from './common/user-management/edit-user-dialog/edit-user-dialog.component';
import { CreateUserDialogComponent } from './common/user-management/create-user-dialog/create-user-dialog.component';
import { EditExtraFieldsComponent } from './common/user-management/edit-extra-fields/edit-extra-fields.component';

// Generated CRUD components here.
import { Robo_crm_accountsComponent } from './components/robo_crm/accounts/robo_crm_accounts.component';
import { EditRobo_crm_accountsComponent } from './components/robo_crm/accounts/modals/edit.robo_crm_accounts.component';
import { Robo_crm_activitiesComponent } from './components/robo_crm/activities/robo_crm_activities.component';
import { EditRobo_crm_activitiesComponent } from './components/robo_crm/activities/modals/edit.robo_crm_activities.component';
import { Robo_crm_activity_typesComponent } from './components/robo_crm/activity_types/robo_crm_activity_types.component';
import { EditRobo_crm_activity_typesComponent } from './components/robo_crm/activity_types/modals/edit.robo_crm_activity_types.component';
import { Robo_crm_contactsComponent } from './components/robo_crm/contacts/robo_crm_contacts.component';
import { EditRobo_crm_contactsComponent } from './components/robo_crm/contacts/modals/edit.robo_crm_contacts.component';
import { Robo_crm_statusComponent } from './components/robo_crm/status/robo_crm_status.component';
import { EditRobo_crm_statusComponent } from './components/robo_crm/status/modals/edit.robo_crm_status.component';
import { Robo_crm_blaster_email_templatesComponent } from './components/robo_crm/email_templates/robo_crm_blaster_email_templates.component';
import { EditRobo_crm_blaster_email_templatesComponent } from './components/robo_crm/email_templates/modals/edit.robo_crm_blaster_email_templates.component';
import { BlasterComponent } from './components/blaster/blaster.component';
import { MarkdownModule } from 'ngx-markdown';
import { SendEmailComponent } from './components/blaster/send-email/send-email.component';
import { ToastrModule } from 'ngx-toastr';
import { DynamicFormComponent } from './helpers/dynamic-form/dynamic-form.component';


@NgModule({
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    ToastrModule.forRoot({
      timeOut: 150000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const persisted = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');
          if (persisted) {
            return JSON.parse(persisted).token;
          }
          return null;
        },
        allowedDomains: [environment.apiDomain],
      },
    }),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    A11yModule,
  ],
  declarations: [
    AppComponent,
    MagicSelectorComponent,
    MagicUsernameLookupComponent,
    MagicAutocompleteComponent,
    MagicFilterComponent,
    MagicImageComponent,
    MagicImageFieldComponent,
    MagicImageViewComponent,
    MagicFileViewComponent,
    MagicFileComponent,
    MagicFileFieldComponent,
    FormatDatePipe,
    ConfirmDialogComponent,
    UserManagementComponent,
    EditUserDialogComponent,
    CreateUserDialogComponent,
    EditExtraFieldsComponent,
    SendEmailComponent,
    DynamicFormComponent,

    // Generated CRUD components here.
    Robo_crm_accountsComponent,
    EditRobo_crm_accountsComponent,
    Robo_crm_activitiesComponent,
    EditRobo_crm_activitiesComponent,
    Robo_crm_activity_typesComponent,
    EditRobo_crm_activity_typesComponent,
    Robo_crm_contactsComponent,
    EditRobo_crm_contactsComponent,
    Robo_crm_statusComponent,
    EditRobo_crm_statusComponent,
    BlasterComponent,
    Robo_crm_blaster_email_templatesComponent,
    EditRobo_crm_blaster_email_templatesComponent,
  ],

  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule {}
