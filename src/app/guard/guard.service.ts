import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/do";


@Injectable()
export class GuardService {
    isLoggedIn: boolean = false;

    redirectUrl: string = "login"

    logout() {
        this.isLoggedIn = false;
    }

    login(login: string, password: string) {
        return Observable
        .of(true)
        .delay(1000)
        .do(val => {
            if(login === "admin" && password === "pass"){
                this.isLoggedIn = true;
                return this.isLoggedIn;
            }
        })
    }
}