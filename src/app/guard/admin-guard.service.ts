import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { GuardService } from "./guard.service";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private guardService: GuardService, private router: Router) { };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.guardService.isLoggedIn) {
            return true;
        } else {
            this.guardService.redirectUrl = state.url;
            this.router.navigate(['login']);
            return false;
        }
    }
}