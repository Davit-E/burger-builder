import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionCreators from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const onCheckAuthState = () => dispatch(actionCreators.authCheckstate());
    onCheckAuthState();
  }, [dispatch]);

  return (
    <div className='App'>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path='/burger-builder' component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />
            <Redirect from='/' to='burger-builder' />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
};

export default App;
