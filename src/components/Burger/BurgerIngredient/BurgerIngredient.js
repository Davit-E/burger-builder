import React from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const burgerIngredient = (props) => {
  const ingredientChoices = {
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
  if (ingredientChoices[props.type]) {
    return ingredientChoices[props.type];
  } else {
    return null;
  }
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
