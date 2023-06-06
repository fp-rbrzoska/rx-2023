
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
constructor(private _dialog: MatDialog) {
}

  openDialog() {
    this._dialog.open(TestDialogComponent, {
      data: { name: 'Dialog title'},

    })
  }

  openDialogFromTemplate() {
    this._dialog.open(this.dialogTemplate)
  }
}
