import React, { useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilder.module.css';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const onAddIngredient = (ingName) => dispatch(actionCreators.addIngredient(ingName));
  const onRemoveIngredient = (ingName) => dispatch(actionCreators.removeIngredient(ingName));
  const onInitIngredients = () => dispatch(actionCreators.initIngredients());
  const onOrdering = () => dispatch(actionCreators.ordering());
  const onNotOrdering = () => dispatch(actionCreators.notOrdering());
  const onInitOrder = () => dispatch(actionCreators.initOrder());

  const ingredients = useSelector((state) => state.burger.ingredients);
  const totalPrice = useSelector((state) => state.burger.totalPrice);
  const error = useSelector((state) => state.burger.error);
  const orderSent = useSelector((state) => state.order.orderSent);
  const isAuth = useSelector((state) => state.auth.userId != null);
  const building = useSelector((state) => state.burger.building);

  useEffect(() => {
    if (!building || ingredients === null || orderSent) {
      onNotOrdering();
      onInitOrder();
      onInitIngredients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePurchaseable = (ingredients) => {
    const canPurchase = Object.values(ingredients).some(
      (quantity) => quantity > 0
    );
    return canPurchase;
  };

  const purchaseHandler = () => {
    setPurchasing(true);
  };
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    // const obj = {
    //   ...ingredients,
    //   totalPrice: totalPrice,
    // };

    // const queryParams = new URLSearchParams(obj).toString();
    // props.history.push({
    // pathname: '/checkout',
    // search: queryParams,
    // state: obj,
    // });
    onOrdering();
    let redirect = isAuth ? '/checkout' : '/auth';
    props.history.push({ pathname: redirect });
  };

  let orderSummary = null;
  let burgerStuff = !error ? (
    <Spinner />
  ) : (
    <p>Ingredients can't be loaded...</p>
  );

  if (ingredients) {
    const disabledInfo = { ...ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        price={totalPrice}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );

    burgerStuff = (
      <>
        <div className={classes.BurgerWrapper}>
          <Burger ingredients={ingredients} isInBuilder={true} />
        </div>
        <BuildControls
          ingredientAdded={onAddIngredient}
          ingredientRemoved={onRemoveIngredient}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={updatePurchaseable(ingredients)}
          ordered={purchaseHandler}
        />
      </>
    );
  }

  return (
    <div className={classes.BurgerBuilder}>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burgerStuff}
    </div>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
