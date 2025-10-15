import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, signal } from '@angular/core';
import { FeatureModule } from './module/feature/feature-module';
import { SharedModule } from './module/shared/shared-module';

import { Navbar } from './module/shared/components/navbar/navbar';
import { Footer } from './module/shared/components/footer/footer';

import { RouterOutlet } from '@angular/router';
import { AdminModule } from './module/admin/admin-module';

import { select, Store, StoreModule } from '@ngrx/store';

import { UserService } from './State/User/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from './models/AppState';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FeatureModule, SharedModule, Navbar, Footer, RouterOutlet, AdminModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('ecommerce-app');

  userProfile: any;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem('jwt')) this.userService.getUserProfile();
      this.store.pipe(select((store) => store.auth)).subscribe((user) => {
        this.userService.getUserProfile();
      });
    }
  }
}
