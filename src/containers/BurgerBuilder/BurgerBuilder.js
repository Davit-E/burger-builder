import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('https://burger-builder-da45f.firebaseio.com/ingredients/some.json')
      .then((res) => {
        let arr = res.data;
        let ingredients = {};

        for (let i = 0; i < arr.length; i++) {
          const el = arr[i];
          ingredients[Object.keys(el)[0]] = Object.values(el)[0];
        }

        this.setState({ ingredients: ingredients });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  addIngredientHandler = (type) => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newIngredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    this.updatePurchaseState(newIngredients);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newIngredients[type] - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    this.updatePurchaseState(newIngredients);
  };

  updatePurchaseState = (ingredients) => {
    const canPurchase = Object.values(ingredients).some(
      (quantity) => quantity > 0
    );
    this.setState({ purchasable: canPurchase });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // alert('You clicked Continue!');
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: 'David',
        email: 'aa@aaa.com',
      },
      delivery: 'fast',
    };
    axios
      .post('/order.json', order)
      .then((res) => {
        console.log(res);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    let orderSummary = null;
    let burgerStuff = !this.state.error ?  <Spinner /> : <p>Ingredients can't be loaded...</p>;

    if (this.state.ingredients) {
      const disabledInfo = { ...this.state.ingredients };

      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
      burgerStuff = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </>
      );
    }

    return (
      <div className="BurgerBuilder">
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

export default withErrorHandler(BurgerBuilder, axios);
