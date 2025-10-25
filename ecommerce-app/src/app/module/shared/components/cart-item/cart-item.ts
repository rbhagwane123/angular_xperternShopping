import { Component, Input, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../State/Cart/cart.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem implements OnInit {
  @Input() showButton: any;
  @Input() cartItem: any;
  cartItems: any;
  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.cartService.getCart();
    // this.store.pipe(select((store) => store.cart)).subscribe((cart) => {
    //   this.cartItems = cart.cartItems;
    // });
  }

  updateCartItem(num: number) {
    this.cartService.updateCartItem({
      cartItemId: this.cartItem.id,
      data: { quantity: num + this.cartItem.quantity },
    });

    this.store.pipe(select((store) => store.cart)).subscribe((cart) => {
      this.cartItem = cart.cartItems;
      
    });

    console.log(num);
  }

  removeCartItem() {
    this.cartService.removeCartItem(this.cartItem.id);
    
    this.store.pipe(select((store) => store.cart)).subscribe((cart) => {
      this.cartItem = cart.cartItems;
      
    });
  }
}
