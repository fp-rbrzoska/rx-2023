import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxRoutingModule } from './rx-routing.module';
import { RxTestComponent } from './rx-test/rx-test.component';


@NgModule({
  declarations: [
    RxTestComponent
  ],
  imports: [
    CommonModule,
    RxRoutingModule
  ]
})
export class RxModule { }
