import { Routes } from '@angular/router';
import { Home } from './module/feature/components/home/home';
import { Products } from './module/feature/components/products/products';
import { Cart } from './module/feature/components/cart/cart';
import { ProductDetails } from './module/feature/components/product-details/product-details';
import { Checkout } from './module/feature/components/checkout/checkout';
import { Payment } from './module/feature/components/payment/payment';
import { PaymentSuccess } from './module/feature/components/payment-success/payment-success';
import { Order } from './module/feature/components/order/order';
import { OrderDetails } from './module/feature/components/order-details/order-details';
import { Dashboard } from './module/admin/components/dashboard/dashboard';
import { AdminProducts } from './module/admin/components/admin-products/admin-products';
import { OrderTables } from './module/admin/components/order-tables/order-tables';
import { Customers } from './module/admin/components/customers/customers';
import { CreateProduct } from './module/admin/components/create-product/create-product';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./module/admin/components/admin').then((m) => m.Admin),
    children: [
      { path: '', component: Dashboard },
      { path: 'products', component: AdminProducts },
      { path: 'orders', component: OrderTables },
      { path: 'customers', component: Customers },
      { path: 'product-create', component: CreateProduct },
    ],
  },
  { path: '', component: Home },
  { path: 'product', component: Products },
  { path: 'cart', component: Cart },
  { path: 'product-details/:id', component: ProductDetails },
  { path: 'checkout', component: Checkout },
  { path: 'checkout/payment/:id', component: Payment },
  { path: ':lavelOne/:lavelTwo/:lavelThree', component: Products },
  { path: 'payment-success', component: PaymentSuccess },
  { path: 'account/orders', component: Order },
  { path: 'order/:id', component: OrderDetails },
];
