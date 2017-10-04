import { Component, OnInit, /*ViewChild, AfterViewInit*/ } from '@angular/core';
import { ProductService } from '../product/product.service';
//import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from './auth.service';
import { Product } from '../product/product';

@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProductService, AuthService]
})
export class AdminComponent implements OnInit {


  title = 'Product List';
  //private id: number;
  //private activeItem: Product;

  adminForm: FormGroup;

  formErrors = {
    name: ''
  };

  validationMessages = {
    name: {
      required: "Can not be empty",
      minlength: "Minimum 2 letters"
    }
  }

  constructor(private authService: AuthService,
    private product: ProductService,
    //private router: Router,
    //private activedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // this.activedRoute.params.subscribe(params => {
    //   this.id = params['id'];
    //   this.product.getAll().then(data => {
    //     this.activeItem = data[this.id];
    //   });
    // });
  }

  ngOnInit() {

    this.adminForm = this.fb.group({
      name: ["admin", [Validators.required, Validators.minLength(2)]],
      about: [""]
    })

    this.adminForm.valueChanges.subscribe(data => this.valueChanged(data));
  }

  valueChanged(data) {
    for (let field in this.formErrors) {
      this.formErrors[field] = "";
      const control = this.adminForm.get(field);
      if (control.dirty) {
        for (let key in control.errors) {
          this.formErrors[field] = this.validationMessages[field][key];
        }
      }
    }
  }

  addProduct(adminForm: FormGroup) {
    this.product.add(adminForm.value.name, adminForm.value.about);
  }
}
