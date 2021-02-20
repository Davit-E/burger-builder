import React from 'react';
import classes from './Button.module.css';

interface ButtonProps {
  btnType: 'Danger' | 'Success';
  clicked?: () => void;
  children?: string;
}

const button = (props: ButtonProps) => {
  let buttonClass = [classes.Button, classes[props.btnType]];
  return (
    <button onClick={props.clicked} className={buttonClass.join(' ')}>
      {props.children}
    </button>
  );
};

export default button;
