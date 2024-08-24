import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CoursesHttpService} from "../services/courses-http.service";
import {CoursesActions} from "../courses.action-types";
import {concatMap, map} from "rxjs/operators";
import {allCoursesLoadedAction} from "../courses.actions";

@Injectable({
  providedIn: 'root'
})
export class CoursesEffects {
  constructor(private actions$: Actions, private service: CoursesHttpService) {
  }
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadAllCoursesAction),
      concatMap(() => this.service.findAllCourses()),
      map(courses => allCoursesLoadedAction({courses}))
    )
  )
  saveCourses$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CoursesActions.courseUpdated),
        concatMap((action) => this.service.saveCourse(action.updated.id, action.updated.changes))
      )
    }
    , {dispatch: false}
  )

}
