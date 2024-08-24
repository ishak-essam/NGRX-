import {createAction, props} from "@ngrx/store";
import {Course} from "./model/course";
import {Update} from "@ngrx/entity";

export const loadAllCoursesAction = createAction("[Courses Resolver] Load All Courses")
export const allCoursesLoadedAction = createAction("[Load courses effect] All Courses Loaded", props<{ courses: Course[] }>())
export const courseUpdated = createAction("[Edit Courses ]Courses Updated", props<{ updated: Update<Course> }>())//Update built in entity
