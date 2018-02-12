import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ProductModule } from '../product/product.module';
import { ProductListComponent } from '../product/product-list.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';

const routes: Routes = [
  {
    path: 'api/admin', component: ProductListComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminComponent },
      { path: ':id', component: AdminEditComponent },
    ]
  },
  { path: 'api/login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    ProductModule
  ],
  providers: [AuthGuard]
})
export class AdminRoutingModule { }

