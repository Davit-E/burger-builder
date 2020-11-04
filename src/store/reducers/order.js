import actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  orderSent: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_ORDER_START:
      return {
        loading: true,
        orderSent: false,
      };
    case actionTypes.SEND_ORDER_SUCCESSFUL:
      return {
        loading: false,
        orderSent: true,
      };
    case actionTypes.SEND_ORDER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.INIT_ORDER:
      return {
        loading: false,
        orderSent: false,
      };

    default:
      return state;
  }
};

export default reducer;
