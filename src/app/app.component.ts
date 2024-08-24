import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {AppState} from "./reducers";
import {isLoggedInSelector, isLoggedOutSelector} from "./auth/auth.selector";
import {loginAction, logoutAction} from "./auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router,
              private store: Store<AppState>,) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOutSelector))


    const userProfile = localStorage.getItem('user')
    if (userProfile)
      this.store.dispatch(loginAction({user:JSON.parse(userProfile)}))
  }

  logout() {
    this.store.dispatch(logoutAction())
    this.router.navigateByUrl('/login').then(console.log)
  }

}
