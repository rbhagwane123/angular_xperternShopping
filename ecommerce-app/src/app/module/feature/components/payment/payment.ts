import { Component } from '@angular/core';
import { AddressCard } from '../../../shared/components/address-card/address-card';
import { CartItem } from '../../../shared/components/cart-item/cart-item';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payment',
  imports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    AddressCard,
    CartItem,
    MatDivider,
    CommonModule,
  ],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment {
  products = [1, 1, 1];
  cart: any;

  navigateToPayment() {}
}
