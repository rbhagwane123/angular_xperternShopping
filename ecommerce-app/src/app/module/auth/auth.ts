import { Component } from '@angular/core';
import { Signin } from './signin/signin';
import { CommonModule } from '@angular/common';
import { Signup } from './signup/signup';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, Signin, Signup],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  isLoginIn = true;

  changeTemplate = () => {
    this.isLoginIn = !this.isLoginIn;
  };
}
