import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
    private id: number;
    private activeItem;
    editForm: FormGroup;

    formErrors = {
        name: ''
    };
    validationMessages = {
        name: {
            required: 'Can not be empty',
            minlength: 'Minimum 2 letters'
        }
    };

    constructor(private authService: AuthService,
        private product: ProductService,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
           this.activedRoute.params.subscribe(params => {
            this.id = params['id'];
            const prodList = this.product.getProductList();
            prodList.forEach((item, i, arr) => {
                if (item.id === +this.id) {
                    this.activeItem = item;
                }
            });
            this.product.getProductList();
            this.formInit();
            this.editForm.valueChanges.subscribe(data => this.valueChanged(data));
        });
    }

    valueChanged(data) {
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = this.editForm.get(field);         
            if (control.dirty) {
                for (const key in control.errors) {
                    this.formErrors[field] = this.validationMessages[field][key];
                }
            }
        }
    }

    edit(editForm: FormGroup) {
        this.product.editProduct(editForm.value.name, editForm.value.about, this.id);
    }

    close() {
        this.router.navigate(['api/admin']);
    }

    formInit() {
        this.editForm = this.fb.group({
            name: [this.activeItem.name, [Validators.required, Validators.minLength(2)]],
            about: [this.activeItem.about]
        });
    }
}

