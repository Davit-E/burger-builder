import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import SuccessSvg from '../../../components/UI/Svg/SuccessSvg';
import Input from '../../../components/UI/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import { Form, OrderForm } from '../../../types/form_interface';
import { OrderInterface as Order } from '../../../types/order_interface';
import { RootState } from '../../../rootReducer';
import { NavLink } from 'react-router-dom';

const ContactData = () => {
  const dispatch = useDispatch();
  const onSendOrder = () => dispatch(actionCreators.sendOrderStart());
  const onSendOrderSuccessful = (order: Order, token: string) =>
    dispatch(actionCreators.sendOrderSuccessful(order, token));

  const ingredients = useSelector(
    (state: RootState) => state.burger.ingredients
  );
  const price = useSelector((state: RootState) => state.burger.totalPrice);
  const loading = useSelector((state: RootState) => state.order.loading);
  const orderSent = useSelector((state: RootState) => state.order.orderSent);
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [orderForm, setOrderForm] = useState<Form>({
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

  const scrollEl = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollEl.current!.scrollIntoView({ behavior: 'smooth' });
  };

  const checkValidity = (
    value: string,
    rules: {
      required: boolean;
      minLength: number;
      maxLength: number;
    }
  ) => {
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

  const orderHandler = (event: FormEvent) => {
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
      let orderFormObj: OrderForm = {
        name: '',
        email: '',
        street: '',
        zipCode: '',
        deliveryMetod: '',
      };
      for (const key in orderForm) {
        orderFormObj[key] = orderForm[key].value;
      }
      const order: Order = {
        ingredients: ingredients!,
        price: price.toFixed(2),
        userId: userId!,
        orderData: orderFormObj,
      };

      onSendOrder();
      onSendOrderSuccessful(order, token!);
    } else {
      setOrderForm(formCopy);
    }
  };

  const inputChangedHandler = (event: Event, inputKey: string) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
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
        changed={(event: InputEvent) => inputChangedHandler(event, key)}
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
        <NavLink to='/burger' className={classes.OrderAgain}>
          Order Again?
        </NavLink>
      </>
    );
  }

  return (
    <div id='ContactData' className={classes.ContactData}>
      {form}
      <div ref={scrollEl}></div>
    </div>
  );
};

export default withErrorHandler(ContactData, axios);
