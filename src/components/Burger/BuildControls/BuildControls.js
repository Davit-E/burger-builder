import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Tomato', type: 'tomato' },
  { label: 'Onion', type: 'onion' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
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
      <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
      {controlsArr}
      <button onClick={props.ordered} className={classes.OrderButton} disabled={!props.purchasable} >Order</button>
    </div>
  );
};

export default buildControls;
