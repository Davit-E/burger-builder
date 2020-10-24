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
import ACTIONS from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    error: false,
  };

  // componentDidMount() {
  //   axios
  //     .get('https://burger-builder-da45f.firebaseio.com/ingredients/some.json')
  //     .then((res) => {
  //       let arr = res.data;
  //       let ingredients = {};

  //       for (let i = 0; i < arr.length; i++) {
  //         const el = arr[i];
  //         ingredients[Object.keys(el)[0]] = Object.values(el)[0];
  //       }

  //       this.setState({ ingredients: ingredients });
  //     })
  //     .catch((err) => {
  //       this.setState({ error: true });
  //     });
  // }

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
    const obj = {
      ...this.props.ingredients,
      totalPrice: this.props.totalPrice,
    };

    const queryParams = new URLSearchParams(obj).toString();
    this.props.history.push({
      pathname: '/checkout',
      search: queryParams,
      state: obj,
    });
  };

  render() {
    let orderSummary = null;
    let burgerStuff = !this.state.error ? (
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => dispatch({ type: ACTIONS.ADD_INGREDIENT, ingredientName: ingName }),
    onRemoveIngredient: (ingName) => dispatch({ type: ACTIONS.REMOVE_INGREDIENT, ingredientName: ingName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
