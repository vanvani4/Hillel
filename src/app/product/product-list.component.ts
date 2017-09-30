import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

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
    disabled: boolean = true;

    constructor(private product: ProductService, private router: Router, private activedRoute: ActivatedRoute) {
        this.product.getAll().then(data => {
            this.productList = data;
        });
    }

    ngOnInit() { };

    goToAbout(item) {
        this.lastId = item.id;
        this.router.navigate([item.id], { relativeTo: this.activedRoute });
        this.switch();
    }

    isLast(item: Product) {
        return item.id === this.lastId;
    }

    switch() {
        if (this.lastId > 0 && this.lastId != this.productList.length) {
            this.disabled = false;
        }
    }

    next() {
        this.lastId++
        this.router.navigate([this.lastId], { relativeTo: this.activedRoute });
        this.switch()
    }

    back() {
        this.lastId--
        this.router.navigate([this.lastId], { relativeTo: this.activedRoute });
        this.switch()
    }
}
