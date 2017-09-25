import { Component, OnInit, } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';
import { Product } from '../product/product';

@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProductService, AuthService] // ??????????????????????????????????
})
export class AdminComponent implements OnInit {


  title = 'Product List';
  productList: any;
  private id: number;
  private activeItem: Product;

  constructor(private authService: AuthService,
    private product: ProductService,
    private router: Router,
    private activedRoute: ActivatedRoute,
  ) {
    this.activedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.product.getAll().then(data => {
          this.activeItem = data[this.id];
      });
  });
  }

  ngOnInit() {
    //this.activedRoute.params.subscribe(params => {
      //console.log(params);
    //});
  }

  addProduct(text, about) {
    this.product.add(text, about);
  }

  edit(newAbout, newText, id) {
    this.product.editProduct(newText, newAbout, id);
  }
}