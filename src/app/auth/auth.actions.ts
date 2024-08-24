import {createAction, props} from "@ngrx/store";
import {User} from "./model/user.model";

export const  loginAction=createAction("[login Page] User login",props<{user:User}>());
export const  logoutAction=createAction("[logout Action] User logout");
