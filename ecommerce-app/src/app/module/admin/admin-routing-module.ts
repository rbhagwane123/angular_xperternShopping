import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './components/admin';
import { Dashboard } from './components/dashboard/dashboard';

const routes: Routes = [
  { path: '', component: Admin }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  ngOnInit()
  {
    console.log('Inside Admin Routing module');
  }
}
