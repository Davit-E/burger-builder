import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
  const allIngredients = [];
  for (const [key, value] of Object.entries(props.ingredients)) {
    for (let i = 0; i < value; i++) {
      allIngredients.push(
        <BurgerIngredient type={key} key={`${value}${key}${i}`} />
      );
    }
  }

  if (allIngredients.length === 0) {
    allIngredients.push(
      <p key='startAdding'>Please start adding ingredients!</p>
    );
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {allIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
