import React, { Suspense, lazy } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.module.css';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ContactData = lazy(() => import('./ContactData/ContactData'));

const Checkout = (props) => {
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

  const ingredients = useSelector((state) => state.burger.ingredients);
  const ordering = useSelector((state) => state.burger.ordering);

  const cancelHandler = () => {
    props.history.push('/burger-builder');
  };

  const continueHandler = () => {
    props.history.push({
      pathname: props.match.url + '/contact-data',
      search: props.location.search,
      hash: '#ContactData',
    });
  };

  let checkoutSummary = <Redirect to='/burger-builder' />;

  if (ordering) {
    checkoutSummary = (
      <div className={classes.Checkout}>
        <CheckoutSummary
          ingredients={ingredients}
          canceled={cancelHandler}
          continued={continueHandler}
        />
        <Suspense>
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
