import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../action-types';
import { User } from '../model/user.model';

export const authFeaturKey = 'auth';

export interface AuthState {
  user: User | undefined;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
      token: action.token,
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
      token: undefined
    }
  })
);
