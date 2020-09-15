import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
  let buttonClass = [classes.Button, classes[props.btnType]];
  return (
    <button onClick={props.clicked} className={buttonClass.join(' ')}>
      {props.children}
    </button>
  );
};

export default button;
