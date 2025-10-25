import { Component, NgModule, OnInit } from '@angular/core';
import { OrderService } from '../../../../State/Order/order.service';
import { PaymentService } from '../../../../State/Payment/payment.service';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';
import { CommonModule } from '@angular/common';
import { AddressCard } from '../../../shared/components/address-card/address-card';

@Component({
  selector: 'app-payment-success',
  imports: [CommonModule, AddressCard],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.scss',
})
export class PaymentSuccess implements OnInit {
  orderId: any;
  paymentId: any;
  order: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((parans) => {
      this.orderId = parans['order_id'];
      this.paymentId = parans['razor_payment_id'];
    });

    this.orderService.getOrderById(this.orderId);
    const reqData = {
      paymentId: this.paymentId,
      orderId: this.orderId,
    };
    this.paymentService.updatePayment(reqData);

    this.store.pipe(select((store) => store.order)).subscribe((order) => {
      this.order = order.order;
    });
  }
}
