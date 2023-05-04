import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from 'src/app/auth/components/register/register.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {RegisterEffects} from './store/effects/register.effects';
import {AuthService} from './services/auth.service';
import {BackendErrorMessagesModule} from '../shared/modules/backend-error-messages/backend-error-messages.module';
import {PersistenceService} from '../shared/services/persistence.service';
import { LoginComponent } from './components/login/login.component';
import {LoginEffects} from './store/effects/login.effects';
import {GetCurrentUserEffects} from './store/effects/get-current-user.effects';
import {UpdateCurrentUserEffects} from './store/effects/update-current-user.effects';
import {LogoutEffects} from './store/effects/logout-effects';

const routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffects,
      LoginEffects,
      GetCurrentUserEffects,
      UpdateCurrentUserEffects,
      LogoutEffects
    ]),
    BackendErrorMessagesModule
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistenceService]
})
export class AuthModule {}
