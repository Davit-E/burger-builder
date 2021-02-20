import React from 'react';
import classes from './BurgerIngredient.module.css';
import { IngredientTypes } from '../../../types/ingredientTypes_interface';

interface BurgerIngredientProps {
  type: IngredientTypes;
  key?: string;
}

type IngredientChoices = {
  [key in IngredientTypes]: JSX.Element;
}

const ingredientChoices: IngredientChoices = {
  'bread-bottom': (
    <>
      <div className={classes.BreadBottom}></div>
      <div className={classes.Cheese_drip}></div>
      <div className={classes.Shadow}></div>
    </>
  ),
  'bread-top': (
    <div className={classes.BreadTop}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  ),
  meat: <div className={classes.Meat}></div>,
  cheese: (
    <>
      <div className={classes.Cheese}></div>
    </>
  ),
  tomato: <div className={classes.Tomato}></div>,
  onion: <div className={classes.Onion}></div>,
  salad: <div className={classes.Salad}></div>,
};

const burgerIngredient = (props: BurgerIngredientProps) => {
  if (ingredientChoices[props.type]) {
    return ingredientChoices[props.type];
  } else {
    return null;
  }
};

export default burgerIngredient;
