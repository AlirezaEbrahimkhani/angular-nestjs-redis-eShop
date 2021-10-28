import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingComponent } from './auth.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AuthRoutingComponent,
    children: [
      {
        path: 'authorization',
        component: AuthLayoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
