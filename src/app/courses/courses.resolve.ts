import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from "@angular/router";
import {AppState} from "../reducers";
import {select, Store} from "@ngrx/store";
import {loadAllCoursesAction} from "./courses.actions";
import {filter, finalize, first, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {areCouresesLoaded} from "./courses.selector";

@Injectable({
  providedIn: 'root'
})
export class CoursesResolve implements Resolve<any> {
  isLoading = false;

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<any> {

    return this.store.pipe(
      select(areCouresesLoaded), tap((coureseLoaded) => {
        if (!this.isLoading && !coureseLoaded) {
          this.isLoading = true;
          this.store.dispatch(loadAllCoursesAction())
        }
      }),
      filter((coureseLoaded) => coureseLoaded),
      first(),
      finalize(() => {
        this.isLoading = false
      }))
  }

}
