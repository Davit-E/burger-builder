import actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authLogoutTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignIn) => (dispatch) => {
  dispatch(authStart());
  let authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let API_KEY = 'AIzaSyB_9h1E3D6pkhGrf-RUeSVhFSBiiklmqdw';
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  if (!isSignIn) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  }

  axios
    .post(url + API_KEY, authData)
    .then((res) => {
      let expirationDate = Date.now() + res.data.expiresIn * 1000;
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(authLogoutTimeout(res.data.expiresIn));
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(authFail(err.response.data.error.message));
    });
};

export const authCheckstate = () => (dispatch) => {
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('userId');
  if (token) {
    let expirationDate = localStorage.getItem('expirationDate');
    if (expirationDate <= Date.now()) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token, userId));
      dispatch(
        authLogoutTimeout(
          (expirationDate - Date.now()) / 1000
        )
      );
    }
  } else {
    dispatch(authLogout());
  }
};
