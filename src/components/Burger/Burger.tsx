import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import { Ingredients } from '../../types/ingredients_interface';
import { IngredientTypes } from '../../types/ingredientTypes_interface';

interface BurgerProps {
  ingredients: Ingredients;
  isInBuilder?: boolean;
}

const burger = (props: BurgerProps) => {
  const allIngredients = [];
  for (const [key, value] of Object.entries(props.ingredients)) {
    for (let i = 0; i < value; i++) {
      allIngredients.push(
        <BurgerIngredient type={key as IngredientTypes} key={`${value}${key}${i}`} />
      );
    }
  }

  if (allIngredients.length === 0) {
    allIngredients.push(<p key="startAdding">Start adding!</p>);
  }

  let burgerWrapperClass = [classes.BurgerWrapper];
  let burgerClass = [classes.Burger];

  if(props.isInBuilder) {
    burgerWrapperClass.push(classes.BurgerWrapperInBuilder);
    burgerClass.push(classes.BurgerInBuilder);
  }
  return (
      <div className={burgerClass.join(' ')}>
        <BurgerIngredient type="bread-top" />
        {allIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
  );
};

export default burger;
