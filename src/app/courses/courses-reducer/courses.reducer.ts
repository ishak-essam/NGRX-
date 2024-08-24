import {compareCourses, Course} from "../model/course";
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import {CoursesActions} from "../courses.action-types";

export interface CourseState extends EntityState<Course> {
  // courses: Course[];
  // entities: { [Key: number ]:| Course }
  // ids:number[];
  allCoursesLoaded: boolean
}

// let state: CourseState
// state.entities
// state.ids
export const adapter = createEntityAdapter<Course>(
  {
    sortComparer: compareCourses,
    selectId: (course: Course) => course.id,
  }
)
export const courseInitialState = adapter.getInitialState({allCoursesLoaded: false})

export const courseReducer = createReducer(
  courseInitialState,
  on(CoursesActions.allCoursesLoadedAction,
    (state, action) =>
      adapter.addMany(action.courses, {...state, allCoursesLoaded: true},
      )),
  on(CoursesActions.courseUpdated,
    (state, action) =>
      adapter.updateOne(action.updated, state
      ))
)
export const {selectAll} = adapter.getSelectors();
//
