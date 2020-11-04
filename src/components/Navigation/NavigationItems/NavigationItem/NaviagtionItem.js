import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
  let clicked = props.isSideNav ? props.clicked : null;

  let clickFunc = () => {
    if (clicked) {
      clicked();
    }
    if (props.isAuth) {
      props.logout();
    }
  };

  return (
    <li className={classes.NavigationItem} onClick={clickFunc}>
      <NavLink to={props.link} activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
