import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/services/http-service';

@Component({
  selector: 'app-blaster',
  templateUrl: './blaster.component.html',
  styleUrls: ['./blaster.component.scss']
})
export class BlasterComponent implements OnInit {

  // Available templates
  templates: any[] = [];

  // Selected template
  template: any = null;

  // Content of email
  title: string = null;
  body: string = null;

  constructor(private httpServices: HttpService) { }

  ngOnInit() {
    this.httpServices.aista_crm_blaster_email_templates.read({limit: -1}).subscribe({
      next: (result: any[]) => {
        this.templates = result || [];
      },
      error: (error: any) => console.error(error)
    });
  }

  preview() {
    console.log({
      selected: this.template,
      title: this.title,
      body: this.body,
    });
  }
}
