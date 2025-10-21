import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ProductReviewCard } from './product-review-card/product-review-card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { men_jeans } from '../../../../../Data/Men/men_jeans';
import { mens_shirt } from '../../../../../Data/Men/mens_shirt';
import { StarRating } from '../../../shared/components/star-rating/star-rating';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../State/Product/product.service';
import { AppState } from '../../../../models/AppState';
import { select, Store } from '@ngrx/store';
import { log } from 'console';
import { CartService } from '../../../../State/Cart/cart.service';

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
  productId: any;
  product: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.relatedProducts = mens_shirt;

    this.productId = this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.findProductById(this.productId);

    this.store.pipe(select((store) => store.product)).subscribe((product) => {
      this.product = product.product;
    });
  }

  handleAddToCart() {
    const reqData = {
      productId: Number(this.productId),
      size: this.selectedSize,
      price: Number(this.product.discountedPrice),
    };

    this.cartService.addItemCart(reqData);
  
    this.cartService.getCart();
    this.router.navigate(['cart']);
  }
}
