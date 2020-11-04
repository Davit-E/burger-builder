import React, { Component, Suspense, lazy } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.module.css';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const ContactData = lazy(() => import('./ContactData/ContactData'));

class Checkout extends Component {
  // componentDidMount() {
  //   // console.log(this.props.location.state);

  //   let ingredients = {};
  //   let params = new URLSearchParams(this.props.location.search);
  //   let totalPrice = +params.get('totalPrice');
  //   totalPrice = totalPrice.toFixed(2);
  //   for (let i in this.state.ingredients) {
  //     ingredients[i] = params.get(i);
  //   }
  //   this.setState({ ingredients: ingredients, price: totalPrice });
  // }

  cancelHandler = () => {
    this.props.history.push('/burger-builder');
  };

  continueHandler = () => {
    this.props.history.push({
      pathname: this.props.match.url + '/contact-data',
      search: this.props.location.search,
      hash: '#ContactData',
    });
  };

  render() {
    let checkoutSummary = <Redirect to='/burger-builder' />;

    if (this.props.ordering) {
      checkoutSummary = (
        <div className={classes.Checkout}>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            canceled={this.cancelHandler}
            continued={this.continueHandler}
          />
          <Suspense>
            <Route
              path={this.props.match.url + '/contact-data'}
              component={ContactData}
            />
          </Suspense>
        </div>
      );
    }

    return checkoutSummary;
  }
}

const matchStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    ordering: state.burger.ordering,
  };
};

export default connect(matchStateToProps)(Checkout);
