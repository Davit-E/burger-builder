import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

interface NavigationItemProps {
  isSideNav: boolean;
  clicked: () => void;
  link: string;
  isAuth?: boolean
  logout?: () => void;
  children: string;
}

const navigationItem = (props: NavigationItemProps) => {
  let clicked = props.isSideNav ? props.clicked : null;

  let clickFunc = () => {
    if (clicked) {
      clicked();
    }
    if (props.isAuth) {
      props.logout!();
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
