import React from 'react';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
  let isActive = props.active ? classes.active : null;
  return (
    <li className={classes.NavigationItem} >
      <a href={props.link}className={isActive} >
        {props.children}
      </a>
    </li>
  );
};

export default navigationItem;