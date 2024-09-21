import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../cart.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrices: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(data => {
      this.cartItems = data;
      this.totalPrices = this.getTotalPrice();
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
      this.totalPrices = 0;
    });
  }

  checkout() {
    this.cartService.checkout(this.cartItems).subscribe(() => {
      this.cartItems = [];
      this.totalPrices = 0;
    });
  }

}
