import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product: any;

  constructor(private router: Router) {}

  ngOnInit() {
    
  }

  navigate() {
    this.router.navigate([`/product-details/5`]);
  }
}
