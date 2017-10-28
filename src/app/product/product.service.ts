import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

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
      });
  }

  change(item) {
    item.isDone = !item.isDone;
    const body = JSON.stringify(item);

    this.http.put('http://localhost:3000/product/id', { body })
      .map((data: Response) => data.json())
      .subscribe(data => {
        productList = data;
      });
  }

  getAll() {
    productListObs = this.http.get('http://localhost:3000/product');
    productListObs.map((data: Response) => data.json())
      .subscribe(data => {
        productList = data;
      });
    return productList;
  }

  getProductListObs() {
    return productListObs;
  }

  getProductList() {
    return productList;
  }

  getActiveObj(id: number) {
    const activeObj = productList[id];
    return activeObj;
  }

  editProduct(newText: string, newAbout: string, id: number) {
    this.http.put('http://localhost:3000/admin/id', { newText, newAbout, id })
      .map((data: Response) => data.json())
      .subscribe(data => {
        productList = data;
      });
    productList.forEach(function (item, i, arr) {
      if (+id === item.id) {
        item.name = newText;
        item.about = newAbout;
      }
    });
  }

  deleteItem(id: number) {
    const body = { id: id };
    this.http.delete('http://localhost:3000/product/id', new RequestOptions({ body: body }))
      .map((data: Response) => data.json())
      .subscribe(data => {
        data = data;
      });
    productList.forEach(function (item, i, arr) {
      if (+id === item.id) {
        productList.splice(i, 1);
      }
    });
  }
}
