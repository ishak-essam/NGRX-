import {CourseState} from "./courses-reducer/courses.reducer";
import * as fromCourses from "./courses-reducer/courses.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";


export const selectCourseState = createFeatureSelector<CourseState>("courses");


export const selectAllCourses = createSelector(
  selectCourseState,
  fromCourses.selectAll
)

export const selectAdvancedCourses
  = createSelector(
  selectAllCourses,
  courses => courses.filter(ele => ele.category == "ADVANCED"))
export const selectBeginnerCourses
  = createSelector(
  selectAllCourses,
  courses => courses.filter(ele => ele.category == "BEGINNER"))
export const selectPromo
  = createSelector(
  selectAllCourses,
  courses => courses.filter(ele => ele.promo).length)
export const areCouresesLoaded
  = createSelector(
  selectCourseState,
  state=>state.allCoursesLoaded)
