import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  productCount: any = 0;
  constructor(private _HttpClient: HttpClient) {}
  getProductData(): Observable<any> {
    // const apiLink = "http://192.168.1.6:9000/api/productss";
    const apiLink = "https://fakestoreapi.com/products/category/electronics";
    return this._HttpClient.get(apiLink);
  }
  incCount(): Observable<any> {
    this.productCount++;
    return this.productCount;
  }
  decCount(): Observable<any> {
    this.productCount--;
    return this.productCount;
  }
}
