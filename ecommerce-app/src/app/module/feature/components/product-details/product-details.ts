import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ProductReviewCard } from './product-review-card/product-review-card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { lehngacholiPage1 } from '../../../../../Data/Women/LenghaCholi';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { men_jeans } from '../../../../../Data/Men/men_jeans';
import { mens_shirt } from '../../../../../Data/Men/mens_shirt';
import { StarRating } from '../../../shared/components/star-rating/star-rating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [
    MatRadioModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    ProductReviewCard,
    MatProgressBarModule,
    ProductCard,
    StarRating,
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  selectedSize: any;
  reviews = [1, 1, 1];
  relatedProducts: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.relatedProducts = mens_shirt;
  }

  handleAddToCart() {
    this.router.navigate(['cart']);
  }
}
