import { Component, OnInit } from '@angular/core';
import { AddressCard } from '../../../shared/components/address-card/address-card';
import { CartItem } from '../../../shared/components/cart-item/cart-item';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../../State/Product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../State/Order/order.service';
import { PaymentService } from '../../../../State/Payment/payment.service';

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
export class Payment implements OnInit {
  products = [1, 1, 1];
  cart: any;
  order: any;
  address: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private store: Store<AppState>,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) this.orderService.getOrderById(id);

    this.store.pipe(select((store) => store.order)).subscribe((order) => {
      this.order = order.order;
    });
  }

  navigateToPayment = () => {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.paymentService.createPayment(id);

    
  };
}
