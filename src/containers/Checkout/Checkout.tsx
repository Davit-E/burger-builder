import React, { Suspense, lazy } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.module.css';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
const ContactData = lazy(() => import('./ContactData/ContactData'));

interface CheckoutProps {
  history: {
    pathname: string;
    search?: string;
    hash?: string;
  }[];
  match: { url: string };
  location: { search: string };
};

const Checkout = (props: CheckoutProps) => {
  // useEffect(() => {
  //   // console.log(props.location.state);

  //   let ingredients = {};
  //   let params = new URLSearchParams(props.location.search);
  //   let totalPrice = +params.get('totalPrice');
  //   totalPrice = totalPrice.toFixed(2);
  //   for (let i in state.ingredients) {
  //     ingredients[i] = params.get(i);
  //   }
  //   setState({ ingredients: ingredients, price: totalPrice });
  // }, [props]);

  const ingredients = useSelector(
    (state: RootState) => state.burger.ingredients
  );
  const ordering = useSelector(
    (state: RootState) => state.burger.ordering
  );

  const cancelHandler = () => {
    props.history.push({ pathname: '/burger' });
  };

  const continueHandler = () => {
    props.history.push({
      pathname: props.match.url + '/contact-data',
      search: props.location.search,
      hash: '#ContactData',
    });
  };

  let checkoutSummary = <Redirect to='/burger' />;

  if (ordering) {
    checkoutSummary = (
      <div className={classes.Checkout}>
        <CheckoutSummary
          ingredients={ingredients!}
          canceled={cancelHandler}
          continued={continueHandler}
        />
        <Suspense fallback>
          <Route
            path={props.match.url + '/contact-data'}
            component={ContactData}
          />
        </Suspense>
      </div>
    );
  }
  return checkoutSummary;
};

export default Checkout;
