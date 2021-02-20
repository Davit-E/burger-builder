import actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { AppThunk } from '../../types/appThunk';
import {OrderInterface as Order} from '../../types/order_interface';

export const initOrder = () => {
  return {
    type: actionTypes.INIT_ORDER,
  };
};

export const sendOrderStart = () => {
  return {
    type: actionTypes.SEND_ORDER_START,
  };
};

export const sendOrderFailed = () => {
  return {
    type: actionTypes.SEND_ORDER_FAILED,
  };
};

export const sendOrderSuccessful = (order: Order, token: string): AppThunk => (dispatch) => {
  axios
    .post('/orders.json?auth=' + token, order)
    .then(() => {
      dispatch({
        type: actionTypes.SEND_ORDER_SUCCESSFUL,
      });
    })
    .catch((err) => {
      dispatch(sendOrderFailed());
    });
};
