import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { ProductService } from '../product/product.service';
import { Product } from '../product/product';


@Component({
    selector: 'about-app',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    providers: [ProductService]
})
export class AboutComponent implements OnInit {

    aboutTitle = 'About Product';
    private id: number;
    public activeItem: Product;


    constructor(private product: ProductService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            const prodList = this.product.getProductList();
            prodList.forEach((item, i, arr) => {
                if (item.id === +this.id) {
                    this.activeItem = item;
                }
            });
        });
    }

    changeStyle(activeItem) {
        this.product.change(activeItem);
    }

    close() {
        this.router.navigate(['api/product']);
    }
}
