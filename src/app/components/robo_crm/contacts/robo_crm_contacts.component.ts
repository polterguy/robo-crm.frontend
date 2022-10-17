/*
 * Automatically generated by Magic
 */

// Angular specific components
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GridComponent } from '@app/base/grid.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

// Application specific components
import { EditRobo_crm_contactsComponent } from './modals/edit.robo_crm_contacts.component';
import { HttpService } from 'src/app/services/http-service';
import { AuthService } from 'src/app/services/auth-service';
import { EditRobo_crm_activitiesComponent } from '../activities/modals/edit.robo_crm_activities.component';
import { ActivityUiService } from '@app/services/activity-ui-service';

/**
 * "Datagrid" component for displaying instance of Contacts
 * entities from your HTTP REST backend.
 */
@Component({
  selector: 'app-robo_crm_contacts',
  templateUrl: './robo_crm_contacts.component.html',
  styleUrls: ['./robo_crm_contacts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', opacity: '0'})),
      state('expanded', style({height: '*', opacity: '1'})),
      transition('expanded <=> collapsed', animate('0.75s cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class Robo_crm_contactsComponent extends GridComponent implements OnInit {

  @ViewChild("inputValue", { static: false }) inputValue: ElementRef;
  public subscribers: boolean = false;

  /**
   * Which columns we should display. Reorder to prioritize columns differently.
   * Notice! 'delete-instance' should always come last.
   */
  public displayedColumns: string[] = [
    'name',
    'email',
    'account_id.name',
    'created',
    'phone',
    'country',
    'city',
    'linkedIn',
    'meta',
    'delete-instance'
  ];

  public activitiesColumns: string[] = [
    'edit',
    'misc',
    'description',
    'due',
    'delete-instance',
  ];


  // Need to view paginator as a child to update page index of it.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Form control declarations to bind up with reactive form elements.
  public name: FormControl;
  public account_id_name: FormControl;
  public phone: FormControl;
  public email: FormControl;
  public country: FormControl;
  public city: FormControl;
  public linkedIn: FormControl;
  public meta: FormControl;
  public created: FormControl;
  public contact_id: FormControl;
  public account_id: FormControl;


  /**
   * Creates an instance of your CRUD component.
   * 
   * @param httpService Needed to be able to invoke backend during CRUD operations
   * @param authService Needed to check if user has access to invoking CRUD operation
   * @param snackBar Needed to display errror and feedback
   * @param dialog Needed to show modal dialog as user edits or creates new entities
   * @param sanitizer Needed to be able to dynamically display iframes
   * @param activityUiService Needed to correctly display activities
   */
   constructor(
    public httpService: HttpService,
    public authService: AuthService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog,
    protected sanitizer: DomSanitizer,
    public activityUiService: ActivityUiService) {
      super(authService, snackBar, dialog, sanitizer);
      this.filter = {
        limit: 10,
        order: 'contacts.created',
        direction: 'desc'
      };
      const valueSubscribers = localStorage.getItem('only_subscribers');
      if (valueSubscribers) {
        this.subscribers = valueSubscribers === 'yes';
      } else {
        delete this.filter['contacts.subscriber.eq'];
        this.subscribers = false;
      }
    }

  /**
   * Overridde abstract method necessary to return the URL endpoint
   * for CRUD methods to base class.
   */
  public entityBaseUrl() {
    return 'magic/modules/robo-crm/contacts/contacts';
  }

  /**
   * Overridden abstract method from base class, that returns the Observable
   * necessary to actually retrieve items from backend.
   */
  protected read(filter: any) {
    return this.httpService.robo_crm_contacts.read(filter);
  }

  /**
   * Overridden abstract method from base class, that returns the Observable
   * necessary to actually retrieve count of items from backend.
   */
  protected count(filter: any) {
    return this.httpService.robo_crm_contacts.count(filter);
  }

  /**
   * Overridden abstract method from base class, that returns the Observable
   * necessary to actually delete items in backend.
   */
  protected delete(ids: any) {
    return this.httpService.robo_crm_contacts.delete(ids);
  }

  /**
   * Implementation of abstract base class method, to reset paginator
   * of component.
   */
  protected resetPaginator() {
    this.paginator.pageIndex = 0;
    this.filter.offset = 0;
  }

  /**
   * OnInit implementation. Retrieves initial data (unfiltered),
   * and instantiates our FormControls.
   */
  public ngOnInit() {

    // Retrieves data from our backend, unfiltered, and binds our mat-table accordingly.
    this.getData();

    /*
     * Creating our filtering FormControl instances, which gives us "live filtering"
     * on our columns.
     */
    this.name = this.createFormControl('contacts.name.like');
    this.account_id_name = this.createFormControl('account_id.name.like');
    this.phone = this.createFormControl('contacts.phone.like');
    this.email = this.createFormControl('contacts.email.like');
    this.country = this.createFormControl('contacts.country.like');
    this.city = this.createFormControl('contacts.city.like');
    this.linkedIn = this.createFormControl('contacts.linkedIn.like');
    this.meta = this.createFormControl('contacts.meta.like');
    this.created = this.createFormControl('contacts.created.eq');
    this.contact_id = this.createFormControl('contacts.contact_id.eq');
    this.account_id = this.createFormControl('contacts.account_id.eq');
  }

  /**
   * Invoked when user wants to edit an entity
   * 
   * This will show a modal dialog, allowing the user to edit his record.
   */
  public editEntity(entity: any) {

    const dialogRef = this.dialog.open(EditRobo_crm_contactsComponent, {
      data: this.getEditData(entity)
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getData(true, () => {
          this.expandedElement = this.data.filter(x => x.contact_id === this.expandedElement.contact_id)[0];
        });
      }
    });
  }

  /**
   * Invoked when user wants to create a new entity
   * 
   * This will show a modal dialog, allowing the user to supply
   * the initial data for the entity.
   */
  public createEntity() {

    const dialogRef = this.dialog.open(EditRobo_crm_contactsComponent, {
      data: {
        isEdit: false,
        entity: {},
      }});
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.itemCreated(res);
      }
    });
  }

  /**
   * Imports contacts by asking user for a CSV file.
   */
  importContacts() {
    document.querySelector("input").click();
  }

  /**
   * Invoked when value of file input changes.
   */
  uploadFiles(files: FileList) {
    for (let idx = 0; idx < files.length; idx++) {
      this.httpService.uploadFile('robo-crm/contacts/import-contacts', files[idx]).subscribe({
        next: (result) => {
          this.snackBar.open(`${result.imported} contacts was successfully imported, ${result.skipped} contacts was skipped`, 'ok', {
            duration: 5000,
          });
          this.getData();
        },
        error: (error: any) => console.log(error)
      });
    }
    let file: any = document.getElementById("inputValue");
    file.value = "";
  }

  /**
   * Invoked when a row is selected or expanded.
   * 
   * @param row Row that was selected
   */
   selectRow(row: any) {
    if(this.expandedElement && !row.activities) {
      this.getActivities(row);
    }
  }

  /**
   * Invoked when a contact is added to an account.
   * 
   * @param row Row to add contact to
   */
   addActivity(row: any) {

    const dialogRef = this.dialog.open(EditRobo_crm_activitiesComponent, {
      data: {
        isEdit: false,
        entity: {
          contact_id: row.contact_id,
          username: this.authService.me.username(),
          type: 'Misc',
        },
      }});
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getActivities(row);
      }
    });
  }

  /**
   * Edits the specified contact.
   * 
   * @param contact Contact activity belongs to
   * @param activity Activity to edit
   * @returns 
   */
   editActivity(contact: any, activity: any) {
    const dialogRef = this.dialog.open(EditRobo_crm_activitiesComponent, {
      data: this.getEditData(activity)
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getActivities(contact);
      }
    });
    return false;
  }

  /**
   * Deletes the specified activity.
   * 
   * @param activity Actitity to delete
   */
  deleteActivity(activity: any, contact: any) {
    this.httpService.robo_crm_activities.delete({activity_id: activity.activity_id}).subscribe({
      next: () => {
        this.snackBar.open('Activity successfully deleted', 'ok', {
          duration: 5000,
        });
        this.getActivities(contact);
      },
      error: (error: any) => console.error(error)
    });
  }

  filterChanged() {
    localStorage.setItem('only_subscribers', this.subscribers ? 'yes' : 'no');
    if (this.subscribers) {
      this.filter['contacts.subscriber.eq'] = true;
    } else {
      delete this.filter['contacts.subscriber.eq'];
    }
    this.getData(true);
  }

  /**
   * Invoked when we need to fetch contacts for an account.
   * 
   * @param row Row to retrieve contacts for
   */
  private getActivities(row: any) {
    this.httpService.robo_crm_activities.read({
      ['activities.contact_id.eq']: row.contact_id,
      order: 'activities.due',
    }).subscribe({
      next: (result: any[]) => {
        row.activities = result || [];
      },
      error: (error: any) => console.log(error)
    });
  }
}
