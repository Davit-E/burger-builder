import React from 'react';
import classes from './Logo.module.css';
import Burger from '../Burger/Burger';
import { Ingredients } from '../../types/ingredients_interface';
import { NavLink } from 'react-router-dom';

const ingredients: Ingredients = {
  salad: 1,
  tomato: 1,
  onion: 1,
  cheese: 1,
  meat: 1,
};

const logo = () => {
  return (
    // <a className={classes.Logo} href='/'>
    //   <Burger ingredients={ingredients} />
    // </a>
    <NavLink className={classes.Logo} to='/burger' replace>
      <Burger ingredients={ingredients} />
    </NavLink>
  );
};

export default logo;
