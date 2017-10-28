// Реализоваваем метод CanActivate который определяет можно авторизовать пользователя, возвращает true или false.
// В сервисе AuthGuard должны содержится запрос на сервер, который возвращает ответ и устанавливает авторизован ли пользователь.
// Он не отменяет валидацию на сервере.
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';    // CanActivate, это интерфейс и он имплементируется.
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';



@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {// чтобы сохранить текущий путь.
        if (this.authService.isLoggedIn) { // проверка, если мы уже залогинены ...
            return true;                   // то сразу отпралвем на страницу которую пользователь хотел.
        } else {
            this.authService.redirectUrl = state.url; // если нет то в redirectUrl сохраняем текущий путь, от куда мы пришли.
            this.router.navigate(['login']); // и отправляем пользователя на страницу login
            return false;
        }
    }

}
