import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SuccessSvg from '../../../components/UI/Svg/SuccessSvg';
import Input from '../../../components/UI/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

const ContactData = () => {
  const dispatch = useDispatch();
  const onSendOrder = () => dispatch(actionCreators.sendOrderStart());
  const onSendOrderSuccessful = (order, token) =>
    dispatch(actionCreators.sendOrderSuccessful(order, token));

  const ingredients = useSelector((state) => state.burger.ingredients);
  const price = useSelector((state) => state.burger.totalPrice);
  const loading = useSelector((state) => state.order.loading);
  const orderSent = useSelector((state) => state.order.orderSent);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const [orderForm, setOrderForm] = useState({
    name: {
      elemType: 'input',
      elemConfig: {
        type: 'text',
        placeholder: 'Name',
      },
      value: '',
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    email: {
      elemType: 'input',
      elemConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    street: {
      elemType: 'input',
      elemConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    zipCode: {
      elemType: 'input',
      elemConfig: {
        type: 'text',
        placeholder: 'ZIP Code',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      isValid: false,
      touched: false,
    },
    deliveryMetod: {
      elemType: 'select',
      elemConfig: {
        options: [
          {
            value: 'fastest',
            displayOptions: 'Fastest',
          },
          {
            value: 'cheapest',
            displayOptions: 'Cheapest',
          },
        ],
      },
      value: 'fastest',
      validation: {
        required: false,
      },
    },
  });

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollEl = useRef();

  const scrollToBottom = () => {
    scrollEl.current.scrollIntoView({ behavior: 'smooth' });
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.replace(/\s/g, '').length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.replace(/\s/g, '').length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  const orderHandler = (event) => {
    event.preventDefault();
    let formFilled = true;
    let formCopy = { ...orderForm };

    for (const [key, value] of Object.entries(orderForm)) {
      formCopy[key] = { ...orderForm[key], touched: true };
      if (value.validation.required && !value.isValid) {
        formFilled = false;
      }
    }

    if (formFilled) {
      let orderFormObj = {};
      for (const key in orderForm) {
        orderFormObj[key] = orderForm[key].value;
      }

      const order = {
        ingredients: ingredients,
        price: price.toFixed(2),
        userId: userId,
        orderData: orderFormObj,
      };

      onSendOrder();
      onSendOrderSuccessful(order, token);
    } else {
      setOrderForm(formCopy);
    }
  };

  const inputChangedHandler = (event, inputKey) => {
    let value = event.target.value;
    setOrderForm((prevState) => {
      let isValid = checkValidity(value, prevState[inputKey].validation);
      return {
        ...prevState,
        [inputKey]: {
          ...prevState[inputKey],
          value,
          isValid,
          touched: true,
        },
      };
    });
  };

  let orderFormArr = [];
  for (let [key, value] of Object.entries(orderForm)) {
    orderFormArr.push(
      <Input
        key={key}
        {...value}
        changed={(event) => inputChangedHandler(event, key)}
      />
    );
  }

  let form = (
    <form onSubmit={orderHandler}>
      <h4>Enter your contact info:</h4>
      {orderFormArr}
      <Button btnType='Success'>Order</Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  if (orderSent) {
    form = (
      <>
        <SuccessSvg />
        <h3 className={classes.SuccessText}>Your Burger Is on the Way!</h3>
        <a href='/' className={classes.OrderAgain}>
          Order Again?
        </a>
      </>
    );
  }

  return (
    <div id='ContactData' className={classes.ContactData}>
      {form}
      <div ref={scrollEl} />
    </div>
  );
};

export default withErrorHandler(ContactData, axios);
