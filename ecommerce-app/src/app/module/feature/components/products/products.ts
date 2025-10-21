import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { filters, singleFilter } from './FilterData';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { mensPantsPage1 } from '../../../../../Data/pants/men_pants';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../State/Product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/AppState';

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
export class Products implements OnInit {
  filterData: any;
  singleFilterData: any;
  productsData: any;
  lavelThree: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilter;

    this.activatedRoute.paramMap.subscribe((params) => {
      this.lavelThree = params.get('lavelThree');
      var reqData = {
        category: this.lavelThree,
        color: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 10000,
        minDiscount: 0,
        pageNumber: 0,
        pageSize: 10,
        sort: 'price_low',
        stock: null,
      };
      this.productService.findProductByCategory(reqData);
    });

    this.activatedRoute.queryParams.subscribe((params) => {

      const color = params['color'];
      const size = params['size'];
      const discount = params['discount'];
      const stock = params['stock'];
      const price = params['price'];
      const sort = params['sort'];
      const pageNumber = params['pageNumber'];
      const minPrice = price ? price.split('-')[0] : 0;
      const maxPrice = price ? price.split('-')[1] : 10000;

      // this.lavelThree = params['lavelThree'];

      var reqData = {
        category: this.lavelThree,
        color: color ? [color].join(',') : [],
        sizes: size,
        minPrice: minPrice ? minPrice : 0,
        maxPrice: maxPrice ? maxPrice : 0,
        minDiscount: discount ? discount : 0,
        pageNumber: pageNumber ? pageNumber : 0,
        pageSize: 10,
        sort: sort ? sort : 'price_low',
        stock: null,
      };
      this.productService.findProductByCategory(reqData);
    });

    this.store.pipe(select((store) => store.product)).subscribe((product) => {
      this.productsData = product.products.content;
    });
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
