// Отправляет запрос и принимает ответ. Содержит данные залогинен ли пользователь.
// Если мы с какой-то страницы пытаемся зайти на "закрытую" страницу, admin, этот сервис перекидывает нас на страницу login.
// Мы вводим данные и если true. нас перекидывает на страницу на которую мы пытались войти (admin).
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

    isLoggedIn = false; // хранит данные о том авторизованы ли мы в натуре должен быть запрос на сервер, после пробуждения.

    redirectUrl = '/admin'; // сюда записываем путь страницы куда мы собирались (admin), куда мы перейдём в случае удачной авторизации.

    logout() {// отменяет авторизацию
        this.isLoggedIn = false;
    }


    login(login: string, password: string) { // запрос к серверу (будет), операция асинхронная, возвращает Observable.
        return Observable
            .of(true)
            .delay(1000) // сделано специально, задержка 1 секунда (имитация запроса к серверу)
            .do(val => { // результат пришлёт сервер
                if (login === 'admin@admin.com' && password === 'pass') {
                    this.isLoggedIn = true;
                    return this.isLoggedIn;
                }
            });
    }
}
