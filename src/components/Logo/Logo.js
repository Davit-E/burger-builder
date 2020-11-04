import React from 'react';
import classes from './Logo.module.css';
import Burger from '../Burger/Burger'

const logo = () => {
  const ingredients = {
    salad: 1,
    tomato: 1,
    onion: 1,
    cheese: 1,
    meat: 1,
  };

  return (
    <a className={classes.Logo} href='/burger-builder' >
      {/* <img src={burgerLogo} alt='My Buger' /> */}
      <Burger ingredients={ingredients} />
    </a>
  );
};

export default logo;
