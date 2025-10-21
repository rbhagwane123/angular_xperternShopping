import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../shared/components/cart-item/cart-item';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../../State/Cart/cart.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartItem, MatDivider, MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  cart: any;
  cartItems: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.cartService.getCart();
    this.store.pipe(select((store) => store.cart)).subscribe((cart) => {
      this.cart = cart.cart;
      this.cartItems = cart.cartItems;
      console.log('Cart : ', this.cart);
    });
  }

  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
