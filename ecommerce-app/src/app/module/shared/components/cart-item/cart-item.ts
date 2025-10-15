import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  @Input() showButton: any;
  constructor(private router: Router) {}

  updateCartItem(num: number) {
    console.log(num);
  }

  removeCartItem() {
    console.log('remove cart item');
  }
}
