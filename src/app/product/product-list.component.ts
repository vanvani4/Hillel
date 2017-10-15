import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { ProductService } from './product.service'
import { Product } from './product'

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {

    productList;
    lastId: number;
    disabledBack: boolean = false;
    disabledNext: boolean = false;

    constructor(private product: ProductService, private router: Router, private activedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.product.getProductListObs()
            .map((data: Response) => data.json())
            .subscribe(data => {
                this.productList = data;
            })
    }

    goToAbout(item) {
        this.lastId = item.id;
        this.router.navigate([item.id], { relativeTo: this.activedRoute });
    }

    isLast(item: Product) {
        return item.id === this.lastId;
    }

    next() {
        if (this.lastId === this.productList.length - 1) {
            return this.disabledNext = true;
        } else {
            this.lastId++;
            this.router.navigate([this.lastId], { relativeTo: this.activedRoute });
            return [this.disabledNext = false, this.disabledBack = false];
        }
    }

    back() {
        if (this.lastId === 0) {
            return this.disabledBack = true;
        } else {
            this.lastId--;
            this.router.navigate([this.lastId], { relativeTo: this.activedRoute });
            return [this.disabledNext = false, this.disabledBack = false];
        }
    }
}
