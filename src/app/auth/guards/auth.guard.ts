import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {isLoggedInSelector} from "../auth.selector";
import {tap} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private router: Router,private store: Store) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    return this.store.pipe(select(isLoggedInSelector),
      tap((isLogIn) => isLogIn?null:this.router.navigateByUrl('/login')))
  }
}
