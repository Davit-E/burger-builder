import actionTypes from '../actions/actionTypes';
import { AuthState, AuthActionType } from '../../types/authState_interface';

interface KeyAsString {
  [key: string]: string;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  userEmail: null,
  error: null,
  loading: false,
};

const errorMessages: KeyAsString = {
  EMAIL_NOT_FOUND: 'Email not found!',
  INVALID_PASSWORD: 'Invalid password!',
  USER_DISABLED: 'User is disabled!',
  EMAIL_EXISTS: 'Email already exists!',
  OPERATION_NOT_ALLOWED: 'Operation is not allowed!',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempts, please try later...',
};

const authStart = () => {
  return {
    token: null,
    userId: null,
    userEmail: null,
    error: null,
    loading: true,
  };
};

const authSuccess = (action: AuthActionType) => {
  return {
    token: action.token,
    userId: action.userId,
    userEmail: action.userEmail,
    error: null,
    loading: false,
  };
};

const authFail = (state: AuthState, action: AuthActionType) => {
  let error = errorMessages[action.error!];
  return {
    ...state,
    error: error,
    loading: false,
  };
};

const authLogout = () => {
  return {
    token: null,
    userId: null,
    userEmail: null,
    error: null,
    loading: false,
  };
};

const reducer = (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart() as AuthState;
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(action) as AuthState;
    case actionTypes.AUTH_FAIL:
      return authFail(state, action) as AuthState;
    case actionTypes.AUTH_LOGOUT:
      return authLogout() as AuthState;

    default:
      return state;
  }
};

export default reducer;
