import { Component, Input } from '@angular/core';
import { HomeProductCard } from '../home-product-card/home-product-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [HomeProductCard, CommonModule],
  templateUrl: './product-slider.html',
  styleUrl: './product-slider.scss',
})
export class ProductSlider {
  @Input() title: any;
  @Input() products:any;

  ngOnInit()
  {
    
  }

}
