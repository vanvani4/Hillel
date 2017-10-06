import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service'; //после того как подключили в admin.module, подключаем в component
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user: User = new User('', '');
  loginForm: FormGroup;

  formErrors = {
    login: "",
    password: ""
  };

  validationMessages = {
    login: {
      required: "Field login can not be empty",
      email: "Please enter valid email!!!"
    },
    password: {
      required: "Field password can not be empty"
    }
  }


  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  message: string;

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })

    this.loginForm.valueChanges.subscribe(data => this.valueChanged(data));
  }

  valueChanged(data) {
    for (let field in this.formErrors) {
      this.formErrors[field] = "";
      const control = this.loginForm.get(field);
      if (control.dirty) {
        for (let key in control.errors) {
          this.formErrors[field] = this.validationMessages[field][key];
        }
      }
    }
  }

  log() {
    this.message = "Wait please"; //пока не вернулся ответ, показываем сообщение.
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password)
      .subscribe(() => {
        this.router.navigate([this.authService.redirectUrl]);// если валидация прошла, указываем куда перейти (куда собирались)
        this.message='';
      });
  }

  logOut() {
    this.authService.logout(); //в реальной жизни отсылаем запрос на сервер, который анулирует сессию.
  }

}
