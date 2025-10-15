import { Component } from '@angular/core';
import { MainCarousel } from './main-carousel/main-carousel';
import { ProductSlider } from './product-slider/product-slider';
import { CommonModule } from '@angular/common';
import { men_jeans } from '../../../../../Data/Men/men_jeans';
import { gounsPage1 } from '../../../../../Data/Gouns/gouns';
import { lehngacholiPage1 } from '../../../../../Data/Women/LenghaCholi';
import { mens_kurta } from '../../../../../Data/Men/mens_kurta';
import { mensShoesPage1 } from '../../../../../Data/Shoes';



@Component({
  selector: 'app-home',
  imports: [MainCarousel, ProductSlider, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  menJeans: any;
  gouns: any;
  lenhangCholi: any;
  mensKurtas: any;
  Shoes: any;

  ngOnInit() {
    this.menJeans = men_jeans.slice(0, 5);
    this.gouns = gounsPage1.slice(0, 5);
    this.lenhangCholi = lehngacholiPage1.slice(0, 5);
    this.mensKurtas = mens_kurta.slice(0, 5);
    this.Shoes = mensShoesPage1.slice(0, 5);
  }
}
