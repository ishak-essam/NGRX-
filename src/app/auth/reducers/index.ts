import {isDevMode} from '@angular/core';
import {ActionReducerMap, createReducer, MetaReducer, on} from '@ngrx/store';
import {User} from "../model/user.model";
import {authActions} from "../actions.types";

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const reducers: ActionReducerMap<AuthState> = {
  user: undefined
};
// function  authReducer(state,action){}
const initialState: AuthState = {
  user: undefined
}
export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];
export const authReducer = createReducer(initialState,
  on(authActions.loginAction, (state, action) =>
  {
    return {user: action.user}
  }
// {
//   state.user = action.user;
//   return {user: state.user}
// }
),
  on(authActions.logoutAction, (state) => {
    return {user: undefined}
  })
)
