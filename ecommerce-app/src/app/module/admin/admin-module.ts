import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';

import { Admin } from './components/admin';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    Admin
  ]
})
export class AdminModule {

  ngOnInit()
  {
    console.log('Inside Admin module');
  }
 }
