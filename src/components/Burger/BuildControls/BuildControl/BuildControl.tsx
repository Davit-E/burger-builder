import React from 'react';
import actionTypes from '../../../../store/actions/actionTypes';
import { Ingredients } from '../../../../types/ingredients_interface';
import classes from './BuildControl.module.css';


interface BuildControlProps {
  added: (
    ingName: string
  ) => {
    type: actionTypes;
    ingredientName: string;
  };
  removed: (
    ingName: string
  ) => {
    type: actionTypes;
    ingredientName: string;
  };
  disabled: boolean;
  key: string;
  label: string;
  type: string
}


const buildControl = (props: BuildControlProps) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        disabled={props.disabled}
        onClick={() => props.removed(props.type)}
      >
        -
      </button>
      <button className={classes.More} onClick={() => props.added(props.type)}>
        +
      </button>
    </div>
  );
};

export default buildControl;
