import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';

const orderSummary = (props) => {
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
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul style={{padding: 'none'}} className={classes.Ingredients}>{ingredientSummary}</ul>
      <p>Total Price: {props.price.toFixed(2)}$</p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default orderSummary;
