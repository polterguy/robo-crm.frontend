/*
 * Automatically generated by Magic
 */

// Angular specific components
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { EditAista_crm_contactsComponent } from './modals/edit.aista_crm_contacts.component';
import { HttpService } from 'src/app/services/http-service';
import { AuthService } from 'src/app/services/auth-service';

/**
 * "Datagrid" component for displaying instance of Contacts
 * entities from your HTTP REST backend.
 */
@Component({
  selector: 'app-aista_crm_contacts',
  templateUrl: './aista_crm_contacts.component.html',
  styleUrls: ['./aista_crm_contacts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', opacity: '0'})),
      state('expanded', style({height: '*', opacity: '1'})),
      transition('expanded <=> collapsed', animate('0.75s cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class Aista_crm_contactsComponent extends GridComponent implements OnInit {

  /**
   * Which columns we should display. Reorder to prioritize columns differently.
   * Notice! 'delete-instance' should always come last.
   */
  public displayedColumns: string[] = [
    'name',
    'account_id.name',
    'email',
    'created',
    'phone',
    'country',
    'city',
    'linkedIn',
    'meta',
    'delete-instance'
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
   */
   constructor(
    public httpService: HttpService,
    public authService: AuthService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog,
    protected sanitizer: DomSanitizer) {
      super(authService, snackBar, dialog, sanitizer);
      this.filter = {
        limit: 10,
        order: 'contacts.created',
        direction: 'desc'
      };
  }

  /**
   * Overridde abstract method necessary to return the URL endpoint
   * for CRUD methods to base class.
   */
  public entityBaseUrl() {
    return 'magic/modules/aista-crm/contacts';
  }

  /**
   * Overridden abstract method from base class, that returns the Observable
   * necessary to actually retrieve items from backend.
   */
  protected read(filter: any) {
    return this.httpService.aista_crm_contacts.read(filter);
  }

  /**
   * Overridden abstract method from base class, that returns the Observable
   * necessary to actually retrieve count of items from backend.
   */
  protected count(filter: any) {
    return this.httpService.aista_crm_contacts.count(filter);
  }

  /**
   * Overridden abstract method from base class, that returns the Observable
   * necessary to actually delete items in backend.
   */
  protected delete(ids: any) {
    return this.httpService.aista_crm_contacts.delete(ids);
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

    const dialogRef = this.dialog.open(EditAista_crm_contactsComponent, {
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

    const dialogRef = this.dialog.open(EditAista_crm_contactsComponent, {
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
}
