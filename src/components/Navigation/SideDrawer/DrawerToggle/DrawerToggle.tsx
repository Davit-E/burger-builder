import React from 'react';
import classes from './DrawerToggle.module.css';

interface DrawerToggleProps {
  openDrawer: () => void;
}

const drawerToggle = (props: DrawerToggleProps) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.openDrawer}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default drawerToggle;
