import { Component } from '@angular/core';
import { StarRating } from '../../../../shared/components/star-rating/star-rating';

@Component({
  selector: 'app-product-review-card',
  imports: [StarRating],
  templateUrl: './product-review-card.html',
  styleUrl: './product-review-card.scss'
})
export class ProductReviewCard {

}
