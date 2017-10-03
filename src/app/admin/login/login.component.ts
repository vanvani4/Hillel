import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service'; //после того как подключили в admin.module, подключаем в component
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  user: User = new User('','');

  formErrors = {
    login: "",
    password: ""
  };

  validationMessages = {
    login: {
      required: "Can not be empty",
    },
    password: {
      required: "Can not be empty"
    }
  }


  @ViewChild("authorizationForm") form: NgForm;
  constructor(private authService: AuthService, 
    private router: Router) {}

  message: string;

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

  log() {
    this.message="Wait please"; //пока не вернулся ответ, показываем сообщение.
    this.authService.login(this.user.login, this.user.password)
    .subscribe(() => {
      this.router.navigate([this.authService.redirectUrl]); // если валидация прошла, указываем куда перейти (куда собирались)
    });
  }

  logOut(){
    this.authService.logout(); //в реальной жизни отсылаем запрос на сервер, который анулирует сессию.
  }

}
