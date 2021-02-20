import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  burger: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
