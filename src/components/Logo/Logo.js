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
    <div className={classes.Logo}>
      {/* <img src={burgerLogo} alt='My Buger' /> */}
      <Burger ingredients={ingredients} />
    </div>
  );
};

export default logo;
