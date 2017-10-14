import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule} from '@angular/http';

import { ProductRoutingModule } from './product-routing.module';
import { AboutComponent } from '../about/about.component';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';
export { ProductListComponent };

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpModule
  ],
  declarations: [
    AboutComponent,
    ProductListComponent
  ],
  providers: [ProductService],
  exports: [ProductListComponent]
})
export class ProductModule { }
