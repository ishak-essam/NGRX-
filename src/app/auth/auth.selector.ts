import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./reducers";



export const  createSelectorFeature=createFeatureSelector<AuthState>("auth")
//memoized   function
export  const isLoggedInSelector=createSelector(
  createSelectorFeature,
  auth=>!!auth.user //nagiatable conditions
)
export  const isLoggedOutSelector=createSelector(
  isLoggedInSelector,
  auth=>! auth
)




// //memoized   function
// export  const isLoggedInSelector=createSelector(
//   state=>state["auth"],
//     auth=>!!auth.user //nagiatable conditions
// )
// export  const isLoggedOutSelector=createSelector(
//   isLoggedInSelector,
//   auth=>! auth
// )
