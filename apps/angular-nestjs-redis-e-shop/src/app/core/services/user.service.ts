import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _currentUser$ = new BehaviorSubject<Partial<User>>({});
  constructor() {}

  public get getLoggedIn(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  public set setLoggedIn(status: boolean) {
    this._isLoggedIn$.next(status);
  }

  public get getUser(): Observable<Partial<User>> {
    return this._currentUser$.asObservable();
  }

  public set setUser(user: User) {
    this._currentUser$.next(user);
  }
}
