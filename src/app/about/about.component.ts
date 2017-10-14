import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { ProductService } from '../product/product.service';
import { Product } from '../product/product';


@Component( {
    selector: 'about-app',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    providers: [ProductService]
})
export class AboutComponent {

    aboutTitle: string = 'About Product';
    private id: number;
    private activeItem: Product;
    

    constructor (private product: ProductService, private route: ActivatedRoute, private router: Router) { 
        this.route.params.subscribe(params => {
            this.id = params['id'];
            // this.product.getAll().subscribe(data => {
            //     this.activeItem = data[this.id];
            // });
            this.activeItem = this.product.getAll()[this.id];
        });
    }

    changeStyle(activeItem) {
        this.product.change(activeItem);
        console.log(activeItem);
        
    }

    close() {
        this.router.navigate(['product']);
    }
}