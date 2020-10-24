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
    // <div className={burgerWrapperClass.join(' ')}>
    // </div>
  );
};

export default burger;
