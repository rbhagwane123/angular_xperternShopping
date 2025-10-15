import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { filters, singleFilter } from './FilterData';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { HomeProductCard } from '../home/home-product-card/home-product-card';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { mensPantsPage1 } from '../../../../../Data/pants/men_pants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    MatCheckboxModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatRadioModule,
    ProductCard,
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  filterData: any;
  singleFilterData: any;
  mensPants: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilter;
    this.mensPants = mensPantsPage1;
  }

  handleMultipleSelectedFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };

    const filterValue = queryParams[sectionId] ? queryParams[sectionId].split(',') : [];

    const valueIndex = filterValue.indexOf(value);

    if (valueIndex != -1) {
      filterValue.splice(valueIndex, 1);
    } else {
      filterValue.push(value);
    }

    if (filterValue.length > 0) {
      queryParams[sectionId] = filterValue.join(',');
    } else {
      delete queryParams[sectionId];
    }

    this.router.navigate([], { queryParams });
  }

  handleSingleSelectedFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };

    queryParams[sectionId] = value;
    this.router.navigate([], { queryParams });
  }

  
}
