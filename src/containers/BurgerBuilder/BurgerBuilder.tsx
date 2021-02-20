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
import { Ingredients } from '../../types/ingredients_interface';
import { RootState } from '../../rootReducer';

const BurgerBuilder = (props: {
  history: {
    pathname: string;
  }[];
}) => {
  const [purchasing, setPurchasing] = useState<boolean>(false);

  const dispatch = useDispatch();
  const onAddIngredient = (ingName: string) =>
    dispatch(actionCreators.addIngredient(ingName));
  const onRemoveIngredient = (ingName: string) =>
    dispatch(actionCreators.removeIngredient(ingName));
  const onInitIngredients = () => dispatch(actionCreators.initIngredients());
  const onOrdering = () => dispatch(actionCreators.ordering());
  const onNotOrdering = () => dispatch(actionCreators.notOrdering());
  const onInitOrder = () => dispatch(actionCreators.initOrder());

  const ingredients = useSelector(
    (state: RootState) => state.burger.ingredients
  );
  const totalPrice = useSelector((state: RootState) => state.burger.totalPrice);
  const error = useSelector((state: RootState) => state.burger.error);
  const orderSent = useSelector((state: RootState) => state.order.orderSent);
  const isAuth = useSelector((state: RootState) => state.auth.userId != null);
  const building = useSelector((state: RootState) => state.burger.building);

  useEffect(() => {
    if (!building || ingredients === null || orderSent) {
      onNotOrdering();
      onInitOrder();
      onInitIngredients();
    }
  }, []);

  const updatePurchaseable = (ingredients: Ingredients) => {
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
