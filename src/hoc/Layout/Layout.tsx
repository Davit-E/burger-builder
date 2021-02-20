import React, { useState } from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

const Layout = (props: { children: React.ReactNode }) => {
  const [sideDrawerState, setSideDrawerState] = useState<boolean>(false);

  const sideDrawerToggleHandler = () => {
    setSideDrawerState((prevState) => !prevState);
  };

  return (
    <div className={classes.Layout}>
      <Toolbar openDrawer={sideDrawerToggleHandler} />
      <SideDrawer
        open={sideDrawerState}
        clicked={sideDrawerToggleHandler}
        navClicked={sideDrawerToggleHandler}
      />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
