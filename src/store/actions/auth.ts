import actionTypes from './actionTypes';
import axios from 'axios';
import { AppThunk } from '../../types/appThunk';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (
  token: string,
  userId: string,
  userEmail: string
) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    userEmail: userEmail,
  };
};

export const authFail = (error: string) => {
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

export const authLogoutTimeout = (expirationTime: number): AppThunk => (
  dispatch
) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};

export const auth = (
  email: string,
  password: string,
  isSignIn: boolean
): AppThunk => (dispatch) => {
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
      localStorage.setItem('userEmail', email);
      localStorage.setItem('expirationDate', expirationDate.toString());
      dispatch(authSuccess(res.data.idToken, res.data.localId, email));
      dispatch(authLogoutTimeout(res.data.expiresIn));
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(authFail(err.response.data.error.message));
    });
};

export const authCheckstate = (): AppThunk => (dispatch) => {
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('userId');
  let userEmail = localStorage.getItem('userEmail');

  if (token) {
    let expirationDate = +localStorage.getItem('expirationDate')!;
    if (expirationDate <= Date.now()) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token, userId!, userEmail!));
      dispatch(authLogoutTimeout((expirationDate - Date.now()) / 1000));
    }
  } else {
    dispatch(authLogout());
  }
};
