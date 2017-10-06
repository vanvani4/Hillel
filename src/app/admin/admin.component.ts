import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
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
    private fb: FormBuilder) {
  }

  ngOnInit() {

    this.adminForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
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
