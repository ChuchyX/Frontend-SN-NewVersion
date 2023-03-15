import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./auth.UserState";

export const selectAuthState = createFeatureSelector<UserState>('user');

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
