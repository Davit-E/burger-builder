import React from 'react';
import classes from './Input.module.css';

interface InputProps {
  key: string;
  changed: (event: InputEvent | React.ChangeEvent) => void;
  elemType: string;
  isValid?: boolean;
  touched?: boolean;
  value: string;
  elemConfig: {
    type?: string;
    placeholder?: string;
    options?: { value: string; displayOptions: string }[];
  };
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
  label?: any;
}

const input = (props: InputProps) => {
  let inputElement = null;
  let inputClasses = [classes.Input];
  let validationError = null;
  if (!props.isValid && props.validation.required && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>
        Please enter a valid {props.elemConfig.placeholder}
      </p>
    );
  }

  if (props.elemType === 'textarea') {
    inputElement = (
      <textarea
        className={inputClasses.join(' ')}
        value={props.value}
        {...props.elemConfig}
        onChange={props.changed}
      />
    );
  } else if (props.elemType === 'select') {
    inputElement = (
      <select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
      >
        {props.elemConfig.options!.map((el) => {
          return (
            <option key={el.value} value={el.value}>
              {el.displayOptions}
            </option>
          );
        })}
      </select>
    );
  } else {
    inputElement = (
      <input
        className={inputClasses.join(' ')}
        value={props.value}
        {...props.elemConfig}
        onChange={props.changed}
      />
    );
  }

  return (
    <>
      {validationError}
      <label>{props.label}</label>
      {inputElement}
    </>
  );
};

export default input;
