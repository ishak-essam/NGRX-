import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import * as fromApp from './reducers';
import {AuthGuard} from "./auth/guards/auth.guard";
import {EffectsModule} from "@ngrx/effects";
import {RouterState, StoreRouterConnectingModule} from "@ngrx/router-store";
import {CoursesResolve} from "./courses/courses.resolve";

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard],

  },
  {
    path: '**',
    redirectTo: '/'
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent], imports: [BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,

    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    AuthModule.forRoot(),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal
    }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(fromApp.reducers,
      {
        metaReducers: fromApp.metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability:true,
          strictActionSerializability:true,
          strictStateSerializability:true

        }
      })], providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {
}
