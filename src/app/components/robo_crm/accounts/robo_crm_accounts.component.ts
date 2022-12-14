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
import { EditRobo_crm_accountsComponent } from './modals/edit.robo_crm_accounts.component';
import { HttpService } from 'src/app/services/http-service';
import { AuthService } from 'src/app/services/auth-service';
import { EditRobo_crm_contactsComponent } from '../contacts/modals/edit.robo_crm_contacts.component';

/**
 * "Datagrid" component for displaying instance of Accounts
 * entities from your HTTP REST backend.
 */
@Component({
  selector: 'app-robo_crm_accounts',
  templateUrl: './robo_crm_accounts.component.html',
  styleUrls: ['./robo_crm_accounts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', opacity: '0'})),
      state('expanded', style({height: '*', opacity: '1'})),
      transition('expanded <=> collapsed', animate('0.75s cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class Robo_crm_accountsComponent extends GridComponent implements OnInit {

  /**
   * Which columns we should display. Reorder to prioritize columns differently.
   * Notice! 'delete-instance' should always come last.
   */
  public displayedColumns: string[] = [
    'name',
    'status',
    'account_manager',
    'created',
    'delete-instance'
  ];

  /**
   * Columns to show for contacts inside of account card.
   */
  public contactColumns: string[] = [
    'edit',
    'name',
    'email',
    'phone',
  ];

  public mine: boolean = true;

  /**
   * What element is currently expanded.
   */
  public expandedElement: any | null;


  // Need to view paginator as a child to update page index of it.
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Form control declarations to bind up with reactive form elements.
  public name: FormControl;
  public status: FormControl;
  public account_manager: FormControl;
  public created: FormControl;
  public account_id: FormControl;
  public website: FormControl;


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
      const value = localStorage.getItem('my_accounts');
      if (value) {
        this.mine = value === 'yes';
      }
      this.filter = {
        limit: 10,
        order: 'accounts.created',
        direction: 'desc'
      };
  }

  /**
   * Overridde abstract method necessary to return the URL endpoint
   * for CRUD methods to base class.
   */
  public entityBaseUrl() {
    return 'magic/modules/robo-crm/accounts/accounts';
  }

  /**
   * Overridden abstract method from base class, that returns the Observable
   * necessary to actually retrieve items from backend.
   */
  protected read(filter: any) {
    return this.httpService.robo_crm_accounts.read(filter);
  }

  /**
   * Overridden abstract method from base class, that returns the Observable
   * necessary to actually retrieve count of items from backend.
   */
  protected count(filter: any) {
    return this.httpService.robo_crm_accounts.count(filter);
  }

  /**
   * Overridden abstract method from base class, that returns the Observable
   * necessary to actually delete items in backend.
   */
  protected delete(ids: any) {
    return this.httpService.robo_crm_accounts.delete(ids);
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
    this.filterChanged();

    /*
     * Creating our filtering FormControl instances, which gives us "live filtering"
     * on our columns.
     */
    this.name = this.createFormControl('accounts.name.like');
    this.status = this.createFormControl('accounts.status.like');
    this.account_manager = this.createFormControl('accounts.account_manager.like');
    this.created = this.createFormControl('accounts.created.eq');
    this.website = this.createFormControl('accounts.website.like');
    this.account_id = this.createFormControl('accounts.account_id.eq');
  }

  /**
   * Invoked when user wants to edit an entity
   * 
   * This will show a modal dialog, allowing the user to edit his record.
   */
  public editEntity(entity: any) {

    const dialogRef = this.dialog.open(EditRobo_crm_accountsComponent, {
      data: this.getEditData(entity)
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.setEditData(res, entity);
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

    const dialogRef = this.dialog.open(EditRobo_crm_accountsComponent, {
      data: {
        isEdit: false,
        entity: {
          account_manager: this.authService.me.username(),
          status: 'Lead',
        },
      }});
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.itemCreated(res);
      }
    });
  }

  /**
   * Invoked when filtering is changed.
   */
  filterChanged() {
    localStorage.setItem('my_accounts', this.mine ? 'yes' : 'no');
    if (this.mine) {
      this.filter['accounts.account_manager.eq'] = this.authService.me.username();
    } else {
      delete this.filter['accounts.account_manager.eq'];
    }
    this.getData(true);
  }

  /**
   * Invoked when a row is selected or expanded.
   * 
   * @param row Row that was selected
   */
  selectRow(row: any) {
    if(this.expandedElement && !row.contacts) {
      this.getContacts(row);
    }
  }

  /**
   * Invoked when a contact is added to an account.
   * 
   * @param row Row to add contact to
   */
  addContact(row: any) {

    const dialogRef = this.dialog.open(EditRobo_crm_contactsComponent, {
      data: {
        isEdit: false,
        entity: {
          account_id: row.account_id,
        },
      }});
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getContacts(row);
      }
    });
  }

  /**
   * Edits the specified contact.
   * 
   * @param account Account contact belongs to
   * @param contact Contact to edit
   * @returns 
   */
  editContact(account: any, contact: any) {
    const dialogRef = this.dialog.open(EditRobo_crm_contactsComponent, {
      data: this.getEditData(contact)
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getContacts(account);
      }
    });
    return false;
  }

  /**
   * Invoked when we need to fetch contacts for an account.
   * 
   * @param row Row to retrieve contacts for
   */
  private getContacts(row: any) {
    this.httpService.robo_crm_contacts.read({
      ['contacts.account_id.eq']: row.account_id
    }).subscribe({
      next: (result: any[]) => {
        row.contacts = result || [];
      },
      error: (error: any) => console.log(error)
    });
  }
}
