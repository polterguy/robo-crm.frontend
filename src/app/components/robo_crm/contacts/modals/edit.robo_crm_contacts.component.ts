/*
 * Automatically generated by Magic
 */
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http-service';
import { DialogComponent, DialogData } from '@app/base/dialog.component';

/**
 * Modal dialog for editing your existing Contacts entity types, and/or
 * creating new entity types of type Contacts.
 */
@Component({
  templateUrl: './edit.robo_crm_contacts.component.html'
})
export class EditRobo_crm_contactsComponent extends DialogComponent {

  /**
   * Constructor taking a bunch of services injected using dependency injection.
   */
  constructor(
    public dialogRef: MatDialogRef<EditRobo_crm_contactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    protected snackBar: MatSnackBar,
    public service: HttpService) {
    super(snackBar);
    this.primaryKeys = ['contact_id'];
    this.createColumns = [
      'name',
      'account_id',
      'phone',
      'email',
      'country',
      'city',
      'linkedIn',
      'meta',
      'description',
      'subscriber',
      'confirmed',
      'source',
    ];
    this.updateColumns = [
      'name',
      'account_id',
      'phone',
      'email',
      'country',
      'city',
      'linkedIn',
      'meta',
      'contact_id',
      'description',
      'subscriber',
      'confirmed',
      'source',
    ];
    const datesToFormat: string[] = [];
    for (let idx of datesToFormat) {
      if (this.data.entity[idx]) {
        if (typeof this.data.entity[idx] === 'string') {
          if ((<string>this.data.entity[idx]).indexOf('+') === -1 && (<string>this.data.entity[idx]).indexOf('Z') === -1) {
            this.data.entity[idx] += 'Z';
          }
        }
        this.data.entity[idx] = new Date(this.data.entity[idx]);
      }
    }
  }

  /**
   * Returns a reference to ths DialogData that was dependency injected
   * into component during creation.
   */
  protected getData() {
    return this.data;
  }
                             
  /**
   * Returns a reference to the update method, to update entity.
   */
  protected getUpdateMethod() {
    return this.service.robo_crm_contacts.update(this.data.entity);
  }
  /**
   * Returns a reference to the create method, to create new entities.
   */
  protected getCreateMethod() {
    return this.service.robo_crm_contacts.create(this.data.entity);
  }

  /**
   * Closes dialog.
   * 
   * @param data Entity that was created or updated
   */
  public close(data: any) {
    if (data) {
      this.dialogRef.close(data);
    } else {
      this.dialogRef.close();
    }
  }

  /**
   * Returns true if contact can be saved.
   * 
   * @returns True if contact can be saved
   */
  canSave() {
    return this.data.entity.name && this.data.entity.name.length > 0;
  }
}
