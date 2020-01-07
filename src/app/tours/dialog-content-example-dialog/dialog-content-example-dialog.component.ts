import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.css']
})
export class DialogContentExampleDialogComponent implements OnInit {
  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>) {}

  ngOnInit() {
  }

}
