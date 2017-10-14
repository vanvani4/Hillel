import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from './product';

let productList;

@Injectable()
export class ProductService {
  constructor(private http: Http) { }

  add(text: string, about: string) {
    this.http.post('http://localhost:3000/admin', { text, about })
      .map((data: Response) => data.json())
      .subscribe(data => {
        productList = data;
      })
  }

  change(item) {
    item.isDone = !item.isDone;
  }

  getAll() {
    this.http.get('http://localhost:3000/product')
      .map((data: Response) => data.json())
      .subscribe(data => {
        productList = data;
      })
    return productList;
  }


  getActiveObj(id: number) {
    let activeObj = productList[id];
    return activeObj;
  }

  editProduct(newText: string, newAbout: string, id: number) {
    this.http.post('http://localhost:3000/admin/id', { newText, newAbout, id })
      .map((data: Response) => data.json())
      .subscribe(data => {
        productList = data;
      })
  }
}