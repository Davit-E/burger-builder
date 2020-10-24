import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.module.css';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  // state = {
  //   ingredients: {
  //     salad: 0,
  //     tomato: 0,
  //     onion: 0,
  //     cheese: 0,
  //     meat: 0,
  //   },
  //   price: 0,
  // };

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
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          canceled={this.cancelHandler}
          continued={this.continueHandler}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
          // render={(props) => (
          //   <ContactData
          //     {...props}
          //     ingredients={this.props.ingredients}
          //   />
          // )}
        />
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
  };
};

export default connect(matchStateToProps)(Checkout);
