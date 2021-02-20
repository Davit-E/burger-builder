import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

interface SideDrawerProps {
  open: boolean;
  clicked: () => void;
  navClicked: () => void;
}

const sideDrawer = (props: SideDrawerProps) => {
  let openOrClosed = props.open ? classes.Open : classes.Closed;
  let sideDrawerClasses = [classes.SideDrawer, openOrClosed];
  return (
    <>
      <Backdrop show={props.open} clicked={props.clicked} />
      <div className={sideDrawerClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isSideNav={props.open} navClicked={props.navClicked} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
