import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NaviagtionItem';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import { RootState } from '../../../rootReducer';

interface NavigationItemsProps {
  isSideNav?: boolean;
  navClicked?: () => void;
}

const NavigationItems = (props: NavigationItemsProps) => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actionCreators.authLogout());
  const onNotOrdering = () => dispatch(actionCreators.notOrdering());
  const isAuth = useSelector((state: RootState) => state.auth.userId != null);

  let logoutFunc = () => {
    onLogout();
    onNotOrdering();
  };

  let navigationItems = (
    <NavigationItem
      isSideNav={props.isSideNav!}
      clicked={props.navClicked!}
      link='/auth'
    >
      Sign In
    </NavigationItem>
  );

  if (isAuth) {
    navigationItems = (
      <>
        <NavigationItem
          isSideNav={props.isSideNav!}
          clicked={props.navClicked!}
          link='/orders'
        >
          Orders
        </NavigationItem>

        <NavigationItem
          isSideNav={props.isSideNav!}
          clicked={props.navClicked!}
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
        isSideNav={props.isSideNav!}
        clicked={props.navClicked!}
        link='/burger'
      >
        Burger Builder
      </NavigationItem>
      {navigationItems}
    </ul>
  );
};

export default NavigationItems;
