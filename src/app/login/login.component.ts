import { Component, OnInit } from '@angular/core';
import { GuardService } from '../guard/guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(private guardService: GuardService, private router: Router) { }

  ngOnInit() {
  }

  log(login: string, password: string) {
    this.message="Wait please";
    this.guardService.login(login, password)
    .subscribe(() => {
      this.router.navigate([this.guardService.redirectUrl]);
    });
  }
}
