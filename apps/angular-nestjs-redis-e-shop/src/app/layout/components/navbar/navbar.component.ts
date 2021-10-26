import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core';

@Component({
  selector: 'angular-nestjs-redis-e-shop-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
