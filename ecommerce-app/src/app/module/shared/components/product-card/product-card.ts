import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard implements OnInit {
  @Input() product: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // console.log('Product-Card details ', this.product.imageUrl);
  }

  navigate(productId: any) {
    
    this.router.navigate([`/product-details/${productId}`]);
  }
}
