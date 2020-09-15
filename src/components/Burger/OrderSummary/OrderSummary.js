import React from 'react';
import Button from '../../UI/Button/Button';

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
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>Total Price: {props.price.toFixed(2)}$</p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default orderSummary;
