import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/services/http-service';

@Component({
  selector: 'app-blaster',
  templateUrl: './blaster.component.html',
  styleUrls: ['./blaster.component.scss']
})
export class BlasterComponent implements OnInit {

  constructor(private httpServices: HttpService) { }

  ngOnInit() {
    this.httpServices.aista_crm_blaster_email_templates.read({limit: -1}).subscribe({
      next: (result: any[]) => {
        console.log(result);
      },
      error: (error: any) => console.error(error)
    });
  }
}
