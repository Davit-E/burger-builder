import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import actionTypes from '../../../store/actions/actionTypes';
import { Ingredients } from '../../../types/ingredients_interface';

interface BuildControlsProps {
  ingredientAdded: (
    ingName: string
  ) => {
    type: actionTypes;
    ingredientName: string;
  };
  ingredientRemoved: (
    ingName: string
  ) => {
    type: actionTypes;
    ingredientName: string;
  };
  disabled: Ingredients;
  price: number;
  purchasable: boolean;
  ordered: () => void;
}

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Tomato', type: 'tomato' },
  { label: 'Onion', type: 'onion' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props: BuildControlsProps) => {
  const controlsArr = controls.map((ctrl) => (
    <BuildControl
      key={ctrl.label}
      label={ctrl.label}
      type={ctrl.type}
      added={props.ingredientAdded}
      removed={props.ingredientRemoved}
      disabled={props.disabled[ctrl.type]}
    />
  ));

  return (
    <div className={classes.BuildControls}>
      <div className={classes.Content}>
        {controlsArr}
        <p>Current Price: {props.price.toFixed(2)}$</p>
        <button
          onClick={props.ordered}
          className={classes.OrderButton}
          disabled={!props.purchasable}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default buildControls;
