import { Component, Input, NgModule } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../State/Auth/auth.service';


@Component({
  selector: 'app-signin',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  loginForm: FormGroup;
  @Input() changeTemplate: any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      console.log('Login req data, ', this.loginForm.value);
    }
  }
}
