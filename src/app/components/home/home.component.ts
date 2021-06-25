import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./../../services/products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: any;
  // imgPrefix: string = "http://192.168.1.6:9000/storage/products/";
  sub: any;
  // productCount: any;
  order: Array<any> = [];
  item: any;
  isExist: any;
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    if (localStorage.getItem("Products") != null && localStorage.getItem("cartOrder") != null) {
      this._ProductsService.productCount = localStorage.getItem("Products");
      this.order = Array.from(JSON.parse(localStorage.getItem("cartOrder")!));
    } else {
      this._ProductsService.productCount = 0;
      this.order = [];
    }
    this.sub = this._ProductsService.getProductData().subscribe(
      (response) => {
        // this.products = response.products;
        this.products = response;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.sub.unsubscribe();
      },
    );
  }
  addToCart(eventInfo: any, amount: any, id: any) {
    let productId: any = id;
    this.item = {
      productId: eventInfo.target.parentNode.childNodes[1].innerText,
      productName: eventInfo.target.parentNode.childNodes[0].innerText,
      productPrice: eventInfo.target.parentNode.childNodes[4].innerText,
      productAmount: Number(amount),
      productTotalPrice: Number(eventInfo.target.parentNode.childNodes[4].innerText) * Number(amount),
    };
    this.isExist = this.order.findIndex((e) => e.productId == productId);
    if (this.isExist != -1) {
      this.order[this.isExist].productAmount += this.item.productAmount;
      this.order[this.isExist].productTotalPrice += this.item.productTotalPrice;
      localStorage.setItem("cartOrder", JSON.stringify(this.order));
    } else {
      // this._ProductsService.productCount++;
      this._ProductsService.incCount();
      localStorage.setItem("Products", JSON.stringify(this._ProductsService.productCount));
      this.order.push(this.item);
      localStorage.setItem("cartOrder", JSON.stringify(this.order));
    }
  }
  // removeOne() {
  //   this.productCount--;
  //   this.order.pop();
  //   localStorage.setItem("cartOrder", JSON.stringify(this.order));
  //   localStorage.setItem("Products", JSON.stringify(this.productCount));
  // }
}
