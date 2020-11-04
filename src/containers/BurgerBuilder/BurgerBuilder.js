import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilder.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    if (
      !this.props.building ||
      this.props.ingredients === null ||
      this.props.orderSent
    ) {
      this.props.onNotOrdering();
      this.props.onInitOrder();
      this.props.onInitIngredients();
    }
  }

  updatePurchaseable = (ingredients) => {
    const canPurchase = Object.values(ingredients).some(
      (quantity) => quantity > 0
    );
    return canPurchase;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const obj = {
    //   ...this.props.ingredients,
    //   totalPrice: this.props.totalPrice,
    // };

    // const queryParams = new URLSearchParams(obj).toString();
    // this.props.history.push({
    // pathname: '/checkout',
    // search: queryParams,
    // state: obj,
    // });
    this.props.onOrdering();
    let redirect = this.props.isAuth ? '/checkout' : '/auth';
    this.props.history.push({ pathname: redirect });
  };

  render() {
    let orderSummary = null;
    let burgerStuff = !this.props.error ? (
      <Spinner />
    ) : (
      <p>Ingredients can't be loaded...</p>
    );

    if (this.props.ingredients) {
      const disabledInfo = { ...this.props.ingredients };

      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );

      burgerStuff = (
        <>
          <div className={classes.BurgerWrapper}>
            <Burger ingredients={this.props.ingredients} isInBuilder={true} />
          </div>
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseable(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </>
      );
    }

    return (
      <div className={classes.BurgerBuilder}>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burgerStuff}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    orderSent: state.order.orderSent,
    isAuth: state.auth.userId != null,
    building: state.burger.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) =>
      dispatch(actionCreators.addIngredient(ingName)),
    onRemoveIngredient: (ingName) =>
      dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onOrdering: () => dispatch(actionCreators.ordering()),
    onNotOrdering: () => dispatch(actionCreators.notOrdering()),
    onInitOrder: () => dispatch(actionCreators.initOrder()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
