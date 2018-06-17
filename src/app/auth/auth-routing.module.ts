import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page.component';
import { UserHomeComponent } from './components/user-home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CallbackComponent } from '@app/auth/components/callback.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'callback', component: CallbackComponent },
      {
        path: 'home',
        component: UserHomeComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ]
})
export class AuthRoutingModule {}
