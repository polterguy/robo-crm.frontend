import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/confirm-deletion-dialog/confirm-dialog.component';
import { HttpService } from '@app/services/http-service';
import { SendEmailComponent } from './send-email/send-email.component';

@Component({
  selector: 'app-blaster',
  templateUrl: './blaster.component.html',
  styleUrls: ['./blaster.component.scss']
})
export class BlasterComponent implements OnInit {

  templates: any[] = [];
  emails: any[] = [];

  // Currently edited email.
  email: any = {
    title: null,
    content: '',
  };

  constructor(
    private httpServices: HttpService,
    private snackBar: MatSnackBar,
    protected dialog: MatDialog) { }

  ngOnInit() {
    this.httpServices.aista_crm_blaster_email_templates.read({limit: -1}).subscribe({
      next: (result: any[]) => {
        this.templates = result || [];
      },
      error: (error: any) => console.error(error)
    });
    this.getEmails();
  }

  getEmails(onAfter: () => void = null) {
    this.httpServices.aista_crm_blaster_emails.read({limit: -1}).subscribe({
      next: (result: any[]) => {
        this.emails = result || [];
        if (onAfter) {
          onAfter();
        }
      },
      error: (error: any) => console.error(error)
    });
  }

  newEmail() {
    this.email = {
      title: '',
      content: '',
    };
  }

  close() {
    this.email = {
      title: null,
      content: '',
    };
  }

  delete() {

    // Asking user to confirm deletion of entity.
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '550px',
      data: {
        title: 'Confirm deletion',
        text: 'Please confirm deletion of email. Notice, this action cannot be undone. Deletion is permanent',
      }
    });

    // Subscribing to close such that we can delete schedule if it's confirmed.
    dialogRef.afterClosed().subscribe((result: ConfirmDialogData) => {

      // Checking if user confirmed that he wants to delete the schedule.
      if (result && result.confirmed) {
    
        if (!this.email.email_id) {
          this.email = {
            title: null,
            content: '',
          };
          return;
        }
        this.httpServices.aista_crm_blaster_emails.delete({email_id: this.email.email_id}).subscribe({
          next: () => {
            this.email = {
              title: null,
              content: '',
            };
            this.getEmails();
            this.snackBar.open('Email deleted', 'ok', {
              duration: 5000,
            });
          },
          error: (error) => console.error(error)
        });
        
      }
    });
  }

  saveCopy() {

      // Creating new email.
      const payload: any = {
        title: this.email.title + ' - copy',
        content: this.email.content,
        email_template_id: this.email.email_template_id,
      };
      this.httpServices.aista_crm_blaster_emails.create(payload).subscribe({
        next: (result: any) => {
          this.snackBar.open('Email saved', 'ok', {
            duration: 5000,
          });
          this.getEmails(() => {
            this.email = this.emails.filter(x => x.email_id === result.id)[0];
          });
        },
        error: (error: any) => console.error(error)
      });

  }

  save() {
    if (this.email.email_id) {

      // Updating existing email.
      this.httpServices.aista_crm_blaster_emails.update({
          title: this.email.title,
          content: this.email.content,
          email_id: this.email.email_id,
          email_template_id: this.email.email_template_id,
        }).subscribe({
        next: () => {
          this.snackBar.open('Email saved', 'ok', {
            duration: 5000,
          });
        },
        error: (error: any) => console.error(error)
      });

    } else {

      // Creating new email.
      this.httpServices.aista_crm_blaster_emails.create({
        title: this.email.title,
        content: this.email.content,
        email_id: this.email.email_id,
        email_template_id: this.email.email_template_id,
      }).subscribe({
        next: (result: any) => {
          this.snackBar.open('Email saved', 'ok', {
            duration: 5000,
          });
          this.email.email_id = result.id;
          this.getEmails(() => {
            this.email = this.emails.filter(x => x.email_id === result.id)[0];
          });
        },
        error: (error: any) => console.error(error)
      });

    }
  }

  send() {
    const dialogRef = this.dialog.open(SendEmailComponent, {
      width: '80%',
      data: {
        email_id: this.email.email_id,
      }
    });
  }
}
