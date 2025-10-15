import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartItem } from '../../../shared/components/cart-item/cart-item';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartItem, MatDivider, MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = [1, 1, 1];
  constructor(private router: Router) {}

  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
