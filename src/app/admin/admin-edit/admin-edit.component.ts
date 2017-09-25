import { Component, OnInit, } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';
import { Product } from '../../product/product';

@Component({
  selector: 'admin-edit-root',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
  providers: [ProductService]
})
export class AdminEditComponent implements OnInit {

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

    edit(newText, newAbout, id) {
        this.product.editProduct(newText, newAbout, id);
    }

    close () {
        this.router.navigate(['admin']);
    }
    

    ngOnInit( ) {

    }
}
    