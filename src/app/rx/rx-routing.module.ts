import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxTestComponent } from './rx-test/rx-test.component';

const routes: Routes = [
{ path: '', component: RxTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxRoutingModule { }
