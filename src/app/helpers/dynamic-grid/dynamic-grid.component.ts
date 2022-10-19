import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss']
})
export class DynamicGridComponent {

  constructor(
    public dialogRef: MatDialogRef<DynamicGridComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  getHeaders() {
    let headers: string[] = [];
    if(this.data.items) {
      this.data.items.forEach((value: any) => {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }

  close() {
    this.dialogRef.close();
  }
}
