import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderCard } from './order-card/order-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [CommonModule, MatCheckboxModule, OrderCard],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
export class Order {
  orderFilter = [
    { value: 'on_the_way', label: 'On the Way' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'returned', label: 'Return' },
  ];
  orders = [
    [1, 1],
    [1, 1, 1],
  ];


    constructor(private router: Router) {}


  navigateToOrderDetails = (id: number) => {
    this.router.navigate([`order/${id}`]);
  };

  ngOnInit() {
    // this.orderFilter
  }
}
