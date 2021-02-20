import React from 'react';
import { Ingredients } from '../../types/ingredients_interface';
import classes from './Order.module.css';

interface OrderProps {
  ingredients: Ingredients;
  price: string;
  key: string;
};

const order = (props: OrderProps) => {
  let ingredients = 'Ingredients:';

  for (let [key, value] of Object.entries(props.ingredients)) {
    ingredients += ` ${key.charAt(0).toUpperCase() + key.slice(1)} (${value}),`;
  }

  ingredients = ingredients.slice(0, -1);

  return (
    <div className={classes.Order}>
      <p>{ingredients}</p>
      <p>
        Price: <strong>{`USD ${props.price}$`}</strong>
      </p>
    </div>
  );
};

export default order;
