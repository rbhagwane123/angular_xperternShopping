import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { Auth } from './auth';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Signin,
    Signup,
    Auth
  ]
})
export class AuthModule { }
