import { Component } from '@angular/core';
import { AddressCard } from '../../../shared/components/address-card/address-card';
import { CommonModule } from '@angular/common';
import { OrderCard } from '../order/order-card/order-card';
import { OrderTracker } from '../../../shared/components/order-tracker/order-tracker';

@Component({
  selector: 'app-order-details',
  imports: [AddressCard, CommonModule, OrderCard, OrderTracker],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails {
  Orders = [11, 1, 1];
  steps = [
    {
      id: 0,
      title: 'PLACED',
      isCompleted: true,
    },
    {
      id: 1,
      title: 'COMFIRMED',
      isCompleted: true,
    },
    {
      id: 2,
      title: 'SHIPPED',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'DELIVERED',
      isCompleted: false,
    },
  ];
}
