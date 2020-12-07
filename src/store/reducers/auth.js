import actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  userEmail: null,
  error: null,
  loading: false,
};

const errorMessages = {
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
const authSuccess = (action) => {
  return {
    token: action.token,
    userId: action.userId,
    userEmail: action.userEmail,
    error: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  let error = errorMessages[action.error];
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart();
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout();

    default:
      return state;
  }
};

export default reducer;
