import { Component, OnInit } from '@angular/core';
import { UserService } from './core';
import { User } from './core/models';

@Component({
  selector: 'angular-nestjs-redis-e-shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _userService: UserService) {}

  ngOnInit() {
    this._checkUserLoggingFromLocalstorage();
  }

  private _checkUserLoggingFromLocalstorage() {
    let user: User = JSON.parse(localStorage.getItem('User') as any);
    let isLoggedIn: boolean = JSON.parse(localStorage.getItem('Token') as any);

    if (isLoggedIn) this._setUserLoggin(user);
  }

  private _setUserLoggin(user: User) {
    this._userService.setUser = user;
    this._userService.setLoggedIn = true;
  }
}
