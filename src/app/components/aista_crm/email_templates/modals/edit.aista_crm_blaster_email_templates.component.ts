/*
 * Automatically generated by Magic
 */
import { throwError } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http-service';
import { DialogComponent, DialogData } from '@app/base/dialog.component';

/**
 * Modal dialog for editing your existing Email_templates entity types, and/or
 * creating new entity types of type Email_templates.
 */
@Component({
  templateUrl: './edit.aista_crm_blaster_email_templates.component.html'
})
export class EditAista_crm_blaster_email_templatesComponent extends DialogComponent {

  /**
   * Constructor taking a bunch of services injected using dependency injection.
   */
  constructor(
    public dialogRef: MatDialogRef<EditAista_crm_blaster_email_templatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    protected snackBar: MatSnackBar,
    public service: HttpService) {
    super(snackBar);
    this.primaryKeys = ['email_template_id'];
    this.createColumns = [
      'name',
      'content'
    ];
    this.updateColumns = [
      'name',
      'content',
      'email_template_id'
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
    return this.service.aista_crm_blaster_email_templates.update(this.data.entity);
  }
  /**
   * Returns a reference to the create method, to create new entities.
   */
  protected getCreateMethod() {
    return this.service.aista_crm_blaster_email_templates.create(this.data.entity);
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
}
