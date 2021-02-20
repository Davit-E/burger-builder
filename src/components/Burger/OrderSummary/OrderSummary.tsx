import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';
import { Ingredients } from '../../../types/ingredients_interface';

interface OrderSummaryProps {
  ingredients: Ingredients;
  price: number;
  purchaseCanceled: () => void;
  purchaseContinued: () => void;
}

const orderSummary = (props: OrderSummaryProps) => {
  const ingredientSummary = Object.entries(props.ingredients).map(
    ([key, value]) => {
      return (
        <li key={key + value}>
          <strong>
            <span style={{ textTransform: 'capitalize' }}>{key}</span>:
          </strong>{' '}
          {value}
        </li>
      );
    }
  );
  return (
    <div className={classes.OrderSummary}>
      <h1 className={classes.OrderHeader}>Your Order</h1>
      <ul style={{ padding: 'none' }} className={classes.Ingredients}>
        {ingredientSummary}
      </ul>
      <p>Total Price: {props.price.toFixed(2)}$</p>
      <p>Continue to Checkout?</p>
      <div>
        <Button btnType='Danger' clicked={props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType='Success' clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default orderSummary;
