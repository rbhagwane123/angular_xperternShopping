import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { navigation } from './navigation';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-content',
  imports: [CommonModule],
  templateUrl: './nav-content.html',
  styleUrl: './nav-content.scss',
})
export class NavContent {
  category: any;
  @Input() selectedSection: any;

  ngOnInit() {
    this.category = navigation;
    console.log('Selection is : ' + this.selectedSection);
  }

  constructor(private router: Router) {}

  handleNavigation = (path: any) => {
    this.router.navigate([path]);
  };
}
