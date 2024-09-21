import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private apiURL = environment.apiUrl + '/cart';

  private checkoutAPI = environment.apiUrl + '/checkout';
  
  constructor( private http: HttpClient) { }

  getCart(): Observable<Product[]> {
    return this.http.get<any>(this.apiURL);
  }

  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURL, product);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiURL);
  }
  

  checkout(products: Product[]): Observable<void> {
    return this.http.post<void>(this.checkoutAPI, products);
  }

}
