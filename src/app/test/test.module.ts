import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';
import { SharedModule } from '../shared/shared.module';
import { TestDialogComponent } from './test-dialog/test-dialog.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    TestComponent,
    TestDialogComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModule
  ]
})
export class TestModule { }
