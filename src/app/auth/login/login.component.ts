import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import {AppState} from "../../reducers";
import {Store} from "@ngrx/store";
import {authActions} from "../actions.types";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private auth: AuthService,
    private router: Router) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const value = this.form.value;
    this.auth.login(value.email, value.password).pipe(tap((user) => {
        console.log(user);
        this.store.dispatch(authActions.loginAction({user})); // dispatch login action to the store
        this.router.navigateByUrl('/courses').then(console.log);
      },
    )).subscribe(
      noop,//in case successfully logged
      () => alert('An error occurred!')
    );
  }

}

