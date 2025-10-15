import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavContent } from './nav-content/nav-content';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '../../../auth/auth';
import { UserService } from '../../../../State/User/user.service';
import { AppState } from '../../../../models/AppState';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule, NavContent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isNavbarContentOpen: any;
  currentSection: any;
  userProfile: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    if (this.getToken()) this.userService.getUserProfile();

    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.userProfile = user.userProfile;
      if (user.userProfile) {
        this.dialog.closeAll();
      }
      console.log('From NavBar User : ', user);
    });
  }

  getToken() {
    if (typeof window !== 'undefined') return localStorage.getItem('jwt');
    else return null;
  }

  openNavbarContent(section: any) {
    this.isNavbarContentOpen = true;
    this.currentSection = section;
  }

  handleOpenLoginModal() {
    this.dialog.open(Auth, {
      width: '500px',
      disableClose: false,
    });
  }

  closeNavbarContent() {
    this.isNavbarContentOpen = false;
  }

  navigateTo(path: any) {
    this.router.navigate([path]);
  }

  @HostListener('document:click', [`$event`])
  onDcoumentsClick(event: MouseEvent) {
    const modalContainer = document.querySelector('.modal-container');
    const openButtons = document.querySelectorAll('.opne-button');

    let clickInsideButton = false;
    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickInsideButton = true;
      }
    });

    if (modalContainer && !clickInsideButton && this.isNavbarContentOpen) {
      this.closeNavbarContent();
    }
  }
}
