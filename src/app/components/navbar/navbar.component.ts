import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./../../services/products.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  productCount: any = 0;
  sub: any;
  constructor(public _ProductsService: ProductsService) {}
  ngOnInit(): void {}
}
