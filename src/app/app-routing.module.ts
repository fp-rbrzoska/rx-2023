import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule)},
{ path: 'rx', loadChildren: () => import('./rx/rx.module').then(m => m.RxModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
