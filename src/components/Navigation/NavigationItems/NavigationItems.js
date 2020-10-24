import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NaviagtionItem';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        isSideNav={props.isSideNav}
        clicked={props.navClicked}
        link="/burger-builder"
      >
        Burger Builder
      </NavigationItem>
      <NavigationItem
        isSideNav={props.isSideNav}
        clicked={props.navClicked}
        link="/orders"
      >
        Orders
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
