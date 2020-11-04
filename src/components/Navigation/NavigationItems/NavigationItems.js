import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NaviagtionItem';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

const navigationItems = (props) => {

  let logoutFunc = () => {
    props.onLogout();
    props.onNotOrdering();
  }


  let navigationItems = (
    <NavigationItem
      isSideNav={props.isSideNav}
      clicked={props.navClicked}
      link='/auth'
    >
      Sign In
    </NavigationItem>
  );

  if (props.isAuth) {
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
          isAuth={props.isAuth}
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

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.userId !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreators.authLogout()),
    onNotOrdering: () => dispatch(actionCreators.notOrdering()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);
