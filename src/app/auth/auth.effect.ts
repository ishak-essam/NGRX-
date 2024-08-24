import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {authActions} from "./actions.types";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class authEffect{
   login$=  createEffect(()=>
      this.actions$.pipe(
        ofType(authActions.loginAction),
        tap((action) =>
          localStorage.setItem("user", JSON.stringify(action.user))))
    ,{dispatch:false} );
   logout$=  createEffect(()=>
      this.actions$.pipe(ofType(authActions.loginAction),
        tap(() =>{
            localStorage.removeItem("user")
            this.router.navigateByUrl('/login').then(console.log)
          }
        ))
    ,{dispatch:false} )
  constructor(private actions$:Actions,private  router:Router) {
    // actions$.subscribe(action =>
      actions$.subscribe(() =>

    {
      // const login$=
      //    this.actions$.pipe(ofType(authActions.loginAction),
      //      tap((action) =>  localStorage.setItem("user", JSON.stringify(action.user))))


      // const logout$=
      //     this.actions$.pipe(ofType(authActions.loginAction),
      //       tap((action) =>{
      //         localStorage.removeItem("user")
      //         this.router.navigateByUrl('/login')
      //         }
      //       ))

      // login$.subscribe()
      // logout$.subscribe()
     this.login$.subscribe()
      this.logout$.subscribe()

      // const login$=  this.actions$.pipe(ofType(authActions.loginAction),
      //   tap((action) =>  localStorage.setItem("user", JSON.stringify(action.user))))

      // if(action.type==="[login Page] User login")
      //   localStorage.setItem("user", JSON.stringify(action["user"]));
    })
  }
}
