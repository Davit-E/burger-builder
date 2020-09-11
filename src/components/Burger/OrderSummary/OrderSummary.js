import React from 'react';

const orderSummary = (props) => {
  const ingredientSummary = props.ingredients.map((el) => {
    return (
      <li>
        {el.type}: {el.value}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
    </>
  );
};

export default orderSummary;
