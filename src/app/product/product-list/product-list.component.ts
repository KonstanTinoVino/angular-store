import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];

  filterValueProducts: Product[] = [];

  sortOrder: string = '';

  constructor(private productService: ProductService,
              private cartService: CartService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filterValueProducts = data;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe(() => {
        this.snackBar.open('Product added to cart', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
    });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    filterValue = filterValue.toLowerCase();

    this.filterValueProducts = this.products.filter(product => {
      return product.name.toLowerCase().includes(filterValue);
    });

    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string) {
    this.sortOrder = sortValue;
    if (this.sortOrder === 'priceLowHigh'){
      this.filterValueProducts.sort((a, b) => a.price - b.price);
    }
    else if (this.sortOrder === 'priceHighLow'){
      this.filterValueProducts.sort((a, b) => b.price - a.price);
    }
    else if (this.sortOrder === 'name'){
      this.filterValueProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
