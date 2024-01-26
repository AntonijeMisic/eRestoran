import { Component, Inject, OnInit } from '@angular/core';
import { Jela } from '../../models/Jela';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-potvrda-dialog',
  templateUrl: './potvrda-dialog.component.html',
  styleUrls: ['./potvrda-dialog.component.scss']
})
export class PotvrdaDialogComponent implements OnInit {

  public tip!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {

    this.tip=this.data.tip;
  }

}
