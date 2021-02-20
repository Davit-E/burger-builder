import actionTypes from '../store/actions/actionTypes';

export interface OrderActionType {
  type: actionTypes;
}

export interface OrderState {
  loading: boolean,
  orderSent: boolean,
}
