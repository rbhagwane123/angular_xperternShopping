import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { navigation } from './navigation';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
}
