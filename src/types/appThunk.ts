import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AuthState } from './authState_interface';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AuthState,
  unknown,
  Action<string>
>;
