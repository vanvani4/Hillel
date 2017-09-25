import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  {path: 'product', component: ProductListComponent,
    children: [ 
    {path: '', component: AboutComponent},
    {path: ':id', component: AboutComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
