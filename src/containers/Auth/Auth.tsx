import React, { FormEvent, useState } from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../rootReducer';
import { AuthForm } from '../../types/authForm_interface';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [authForm, setAuthForm] = useState<AuthForm>({
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
    password: {
      elemType: 'input',
      elemConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
  });

  const dispatch = useDispatch();
  const onAuth = (email: string, password: string, isSignIn: boolean) =>
    dispatch(actionCreators.auth(email, password, isSignIn));

  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuth = useSelector((state: RootState) => state.auth.userId !== null);
  const ordering = useSelector((state: RootState) => state.burger.ordering);

  const checkValidity = (value: string, rules: { required: boolean }) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  };

  const inputChangedHandler = (event: InputEvent, inputKey: string) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setAuthForm((prevState) => {
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

  const authHandler = (event: FormEvent) => {
    event.preventDefault();
    let formFilled = true;
    let formCopy = { ...authForm };

    for (const [key, value] of Object.entries(authForm)) {
      formCopy[key] = { ...authForm[key], touched: true };
      if (value.validation.required && !value.isValid) {
        formFilled = false;
      }
    }

    if (formFilled) {
      onAuth(authForm.email.value, authForm.password.value, isSignIn);
    } else {
      setAuthForm(formCopy);
    }
  };

  const signSwitchHandler = () => {
    setIsSwitching((prevState) => !prevState);
    setTimeout(() => {
      setIsSignIn((prevState) => !prevState);
      setIsSwitching((prevState) => !prevState);
    }, 500);
  };

  let authFormArr = [];
  for (let [key, value] of Object.entries(authForm)) {
    authFormArr.push(
      <Input
        key={key}
        {...value}
        changed={(event: InputEvent) => inputChangedHandler(event, key)}
      />
    );
  }
  let signText = 'Sign In';
  let switchText = 'Create account';
  if (!isSignIn) {
    signText = 'Sign Up';
    switchText = 'Sign in instead';
  }

  let form = (
    <>
      <h1 className={classes.SignText}>{signText}</h1>
      <form onSubmit={authHandler}>
        {authFormArr}
        <p className={classes.ErrorMessage}>{error}</p>
        <Button btnType='Success'>Continue</Button>
      </form>
      <Button btnType='Danger' clicked={signSwitchHandler}>
        {switchText}
      </Button>
    </>
  );

  if (loading || isSwitching) {
    form = <Spinner />;
  }

  let redirect = null;
  if (isAuth && ordering) {
    redirect = <Redirect to='/checkout' />;
  } else if (isAuth) {
    redirect = <Redirect to='/burger-builder' />;
  }

  return (
    <div className={classes.Auth}>
      {form}
      {redirect}
    </div>
  );
};

export default Auth;
