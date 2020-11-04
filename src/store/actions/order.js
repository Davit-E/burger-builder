import actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

export const sendOrderSuccessful = (order, token) => (dispatch) => {
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
