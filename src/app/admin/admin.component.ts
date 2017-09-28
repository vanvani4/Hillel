import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';
import { Product } from '../product/product';

@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProductService, AuthService]
})
export class AdminComponent implements OnInit, AfterViewInit {


  title = 'Product List';
  productList: any;
  private id: number;
  private activeItem: Product;
  model: Product = new Product(0, "", false, "");
  
  formErrors = {
    name: ''
  };
  
  validationMessages = {
    name: {
      required: "Can not be empty",
      minlength: "Minimum 2 letters"
    }
  }

  @ViewChild("productForm") form: NgForm;
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

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(data => this.onValueChanged(data))
  }

  onValueChanged(data) {
    const { form } = this.form;

    for (let key in this.formErrors) {
      this.formErrors[key] = "";
      const controll = form.get(key);
      if (controll && controll.errors && controll.dirty) {
        const message = this.validationMessages[key];

        for (let i in controll.errors) {
          this.formErrors[key] = message[i];
        }
      }
    }
  }

  addProduct() {
    this.product.add(this.model.name, this.model.about);
  }

  edit(newAbout, newText, id) {
    this.product.editProduct(newText, newAbout, id);
  }
}