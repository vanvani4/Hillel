import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; //после того как подключили в admin.module, подключаем в component
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  message: string;

  ngOnInit() {
  }

  log(login: string, password: string) {
    this.message="Wait please"; //пока не вернулся ответ, показываем сообщение.
    this.authService.login(login, password)
    .subscribe(() => {
      this.router.navigate([this.authService.redirectUrl]); // если валидация прошла, указываем куда перейти (куда собирались)
    });
  }

  logOut(){
    this.authService.logout(); //в реальной жизни отсылаем запрос на сервер, который анулирует сессию.
  }

}
