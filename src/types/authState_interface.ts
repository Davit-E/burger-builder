import actionTypes from '../store/actions/actionTypes';

export interface AuthActionType {
  type: actionTypes;
  token?: string;
  userId?: string;
  userEmail?: string;
  error?: string;
}

export interface AuthState {
  token: string | null;
  userId: string | null;
  userEmail: string | null;
  error: string | null;
  loading: boolean;
}

