import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '@app/services/http-service';
import { MarkedRenderer } from 'ngx-markdown';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  email: any = null;
  template: any = null;
  html: string = null;

  constructor(
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
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
            const renderer = new MarkedRenderer();
            this.html = renderer.html(this.template.content.replace('[content]', this.email.content));
          },
          error: (error: any) => console.error(error)
        });
      },
      error: (error: any) => console.error(error)
    });
  }
}
