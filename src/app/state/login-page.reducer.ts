import { Action } from '@ngrx/store';
import { AuthActionTypes, AuthActions } from '@app/auth/actions/auth.actions';

export interface State {
  pending: boolean;
  error: string | null;
}

export const initialState: State = {
  pending: false,
  error: null
};

// Not using this stuff at the moment, but leaving it in for reference.
export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return { ...state, pending: true };
    }

    case AuthActionTypes.LoginSuccess: {
      return initialState;
    }

    case AuthActionTypes.LoginFailure: {
      return { ...state, error: action.payload, pending: false };
    }

    default: {
      return state;
    }
  }
}

export const selectPending = (state: State) => state.pending;
export const selectError = (state: State) => state.error;
