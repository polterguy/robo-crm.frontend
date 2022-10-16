import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '@app/services/http-service';
import { marked } from 'marked';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  email: any = null;
  template: any = null;
  html: string = null;
  sources: any[] = [];
  segmentation: string = null;
  total: number = 0;

  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    // Retrieving segmentation options.
    this.httpService.aista_crm_contacts.distinctSources().subscribe({
      next: (sources: any[]) => {
        sources = sources || [];
        this.sources = sources.filter(x => x.source !== null);
        this.total = 0;
        for (const idx of sources) {
          this.total += idx.count;
        }
      }
    });

    // Retrieving email and braiding in with template.
    this.httpService.aista_crm_blaster_emails.read({
      ['emails.email_id.eq']: this.data.email_id
    }).subscribe({
      next: (result: any[]) => {
        this.email = result[0];
        this.httpService.aista_crm_blaster_email_templates.read({
          ['email_templates.email_template_id.eq']: this.email.email_template_id,
        }).subscribe({
          next: (result: any[]) => {
            this.template = result[0];
            const html = marked.parse(this.email.content);
            this.html = this.template.content.replace('[content]', html);
          },
          error: (error: any) => console.error(error)
        });
      },
      error: (error: any) => console.error(error)
    });
  }

  getRecipients() {
    if (this.sources && this.sources.length > 0) {
      if (this.segmentation) {
        return this.sources.filter(x => x.source === this.segmentation)[0].count;
      } else {
        return this.total;
      }
    }
    return '';
  }

  blast() {
    const payload: any = {
      title: this.email.title,
      content: this.html,
    };
    if (this.segmentation) {
      payload.segmentation = this.segmentation;
    }
    this.httpService.aista_crm_blaster_emails.blast(payload).subscribe({
      next: (result: any) => {
        this.snackBar.open('Emails are being sent, you can leave this page now', 'ok', {
          duration: 5000,
        });
      }
    });
  }
}
