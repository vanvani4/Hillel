import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
//import { NgModel } from "@angular/forms"

import { ProductService } from './product.service'
import { Product } from './product'

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    productList: Product[];
    lastId: number;
    disabled: boolean = false;

    constructor(private product: ProductService, private router: Router, private activedRoute: ActivatedRoute) {
        this.product.getAll().then(data => {
            this.productList = data;
        });

        this.activedRoute.params.subscribe(params => console.log(params));
    }

    ngOnInit() { };

    goToAbout(item) {
        this.lastId = item.id;
        this.router.navigate([item.id], { relativeTo: this.activedRoute });
    }

    isLast(item: Product) {
        return item.id === this.lastId;
    }

    switch() {
        return false;
    }

    next() {
        if(this.lastId >= this.productList.length) {
            this.switch();
        }else{
            this.lastId++
            this.router.navigate([this.lastId], { relativeTo: this.activedRoute });
        }
    }

    back() {
        if(this.lastId < 0) {
            this.switch();
        }else{
            this.lastId--
            this.router.navigate([this.lastId], { relativeTo: this.activedRoute });
        }
    }
}
