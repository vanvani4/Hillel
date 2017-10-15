import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product } from './product';

let productList: Product[];
let productListObs: Observable<any>;

@Injectable()
export class ProductService {
  constructor(private http: Http) {
    this.getAll();
  }

  add(text: string, about: string) {
    this.http.put('http://localhost:3000/admin', { text, about })
      .map((data: Response) => data.json())
      .subscribe(data => {
        data = data;
      })
  }

  change(item) {
    item.isDone = !item.isDone;
  }

  getAll() {
    if (!productList) {
      productListObs = this.http.get('http://localhost:3000/product');
      productListObs.map((data: Response) => data.json())
        .subscribe(data => {
          productList = data;
        })
      return productList;
    }
  }

  getProductListObs() {
    return productListObs;
  }

  getProductList() {
    return productList;
  }

  getActiveObj(id: number) {
    let activeObj = productList[id];
    return activeObj;
  }

  editProduct(newText: string, newAbout: string, id: number) {
    this.http.put('http://localhost:3000/admin/id', { newText, newAbout, id })
      .map((data: Response) => data.json())
      .subscribe(data => {
        productList = data;
      })
  }
}