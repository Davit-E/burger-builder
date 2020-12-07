import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NaviagtionItem';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

const NavigationItems = (props) => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actionCreators.authLogout());
  const onNotOrdering = () => dispatch(actionCreators.notOrdering());
  const isAuth = useSelector(state => state.auth.userId !== null);

  let logoutFunc = () => {
    onLogout();
    onNotOrdering();
  };

  let navigationItems = (
    <NavigationItem
      isSideNav={props.isSideNav}
      clicked={props.navClicked}
      link='/auth'
    >
      Sign In
    </NavigationItem>
  );

  if (isAuth) {
    navigationItems = (
      <>
        <NavigationItem
          isSideNav={props.isSideNav}
          clicked={props.navClicked}
          link='/orders'
        >
          Orders
        </NavigationItem>

        <NavigationItem
          isSideNav={props.isSideNav}
          clicked={props.navClicked}
          isAuth={isAuth}
          logout={logoutFunc}
          link='/logout'
        >
          Log Out
        </NavigationItem>
      </>
    );
  }

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        isSideNav={props.isSideNav}
        clicked={props.navClicked}
        link='/burger-builder'
      >
        Burger Builder
      </NavigationItem>
      {navigationItems}
    </ul>
  );
};

export default NavigationItems;
