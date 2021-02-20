import React from 'react';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import { Ingredients } from '../../../types/ingredients_interface';

interface CheckoutSummaryProps {
  ingredients: Ingredients;
  canceled: () => void;
  continued: () => void;
}

const checkoutSummary = (props: CheckoutSummaryProps) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Tasty Choice!</h1>
      <div className={classes.CheckoutBurger}>
        <Burger ingredients={props.ingredients} isInBuilder={false} />
      </div>

      <Button btnType='Danger' clicked={props.canceled}>
        Cancel
      </Button>
      <Button btnType='Success' clicked={props.continued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
