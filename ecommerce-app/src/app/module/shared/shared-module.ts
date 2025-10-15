import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Navbar } from './components/navbar/navbar';
import { NavContent } from './components/navbar/nav-content/nav-content';
import { Footer } from './components/footer/footer';

@NgModule({
  declarations: [
  ],
  imports: [CommonModule, 
    MatIconModule, MatButtonModule, 
    MatMenuModule, Navbar, 
    NavContent, Footer],
  exports: [
    Navbar,
    NavContent,
    Footer
  ],
})
export class SharedModule {}
