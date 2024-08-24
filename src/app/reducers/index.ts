import {isDevMode} from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {routerReducer} from "@ngrx/router-store";

export const appFeatureKey = 'app';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export function logger(reduce: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log(state)
    console.log(action)
    return reduce(state, action)
  }
}


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [logger ] /*development mode*/ : [];
