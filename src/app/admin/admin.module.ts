import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AuthService } from './auth.service'; // подключаем в admin.module, так как он его использует, можно подключать в (главный) app.module

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    LoginComponent,
    AdminEditComponent
  ],
  providers: [AuthService]
})
export class AdminModule { }
