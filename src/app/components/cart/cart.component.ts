import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./../../services/products.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  // productCount: any;
  cartOrders: Array<any> = [];
  willDelete: {} = {};
  productId: any;
  totalPrice: number = 0;
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    if (localStorage.getItem("Products") != null && localStorage.getItem("cartOrder") != null) {
      this._ProductsService.productCount = localStorage.getItem("Products");
      this.cartOrders = JSON.parse(localStorage.getItem("cartOrder")!);
    } else {
      this._ProductsService.productCount = 0;
      this.cartOrders = [];
    }
    for (let i = 0; i < this.cartOrders.length; i++) {
      this.totalPrice += this.cartOrders[i].productTotalPrice;
    }
  }
  deleteItem(eventInfo: any, index: any) {
    this.cartOrders.splice(index, 1);
    this._ProductsService.decCount();
    localStorage.setItem("cartOrder", JSON.stringify(this.cartOrders));
    localStorage.setItem("Products", JSON.stringify(this._ProductsService.productCount));
  }
  deleteAll() {
    this.cartOrders.splice(0, this.cartOrders.length);
    this._ProductsService.productCount = 0;
    localStorage.setItem("cartOrder", JSON.stringify(this.cartOrders));
    localStorage.setItem("Products", JSON.stringify(this._ProductsService.productCount));
  }
}
