import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './components/home/home';
import { Feature } from './feature';
import { MainCarousel } from './components/home/main-carousel/main-carousel';
import { HomeProductCard } from './components/home/home-product-card/home-product-card';
import { ProductSlider } from './components/home/product-slider/product-slider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Home,
    Feature,
    MainCarousel,
    HomeProductCard,
    ProductSlider
  ],
  exports:
  [
    Feature,
    Home,
    ProductSlider
  ]
})
export class FeatureModule { }
