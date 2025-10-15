import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-product-card',
  imports: [CommonModule],
  templateUrl: './home-product-card.html',
  styleUrl: './home-product-card.scss',
})
export class HomeProductCard {
  @Input() product: any;
}
