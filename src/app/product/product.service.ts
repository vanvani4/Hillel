import { Injectable } from '@angular/core';

import { Product } from './product';

let productList: Product[] = [
  new Product(0, "Молоко", false, "1 литр"),
  new Product(1, "Хлеб", false, "Батон, 1 штука"),
  new Product(2, "Вода", false, "6 литров")
]

let productListPromise = Promise.resolve(productList);

@Injectable()
export class ProductService {
    
  add(text, about) {
    productList.push(new Product(productList.length, text, false, about)); 
  }
    
  change(item) {
    item.isDone = !item.isDone;
  }

  getAll(): Promise<Product[]> {
    return productListPromise;
  }

  getActiveObj (id: number): Promise<Product> {
    return productListPromise
    .then((data) => data.find(item => item.id === id));
  }

  editProduct(newText, newAbout, id) {
    productList[id].name = newText;
    productList[id].about = newAbout;
    //console.log(productList[id]);
  }
}