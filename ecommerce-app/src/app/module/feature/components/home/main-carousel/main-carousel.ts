import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { homeCarouselData } from '../../../../../../Data/mainCarousel';


@Component({
  selector: 'app-main-carousel',
  imports: [CommonModule, RouterModule, NgbCarouselModule],
  standalone:true,
  templateUrl: './main-carousel.html',
  styleUrls: ['./main-carousel.scss'],
})
export class MainCarousel {
  carouselData: any;

  ngOnInit() {
    this.carouselData = homeCarouselData;
    
    
    
  }
}
