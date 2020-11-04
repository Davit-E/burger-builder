import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    authForm: {
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
    },
    isSignIn: true,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    // if (rules.minLength) {
    //   isValid = value.replace(/\s/g, '').length >= rules.minLength && isValid;
    // }

    // if (rules.maxLength) {
    //   isValid = value.replace(/\s/g, '').length <= rules.maxLength && isValid;
    // }

    return isValid;
  };

  inputChangedHandler = (event, inputKey) => {
    let value = event.target.value;
    this.setState((prevState) => {
      let isValid = this.checkValidity(
        value,
        prevState.authForm[inputKey].validation
      );
      return {
        authForm: {
          ...prevState.authForm,
          [inputKey]: {
            ...prevState.authForm[inputKey],
            value,
            isValid,
            touched: true,
          },
        },
      };
    });
  };

  authHandler = (event) => {
    event.preventDefault();
    let formFilled = true;
    let formCopy = { ...this.state.authForm };

    for (const [key, value] of Object.entries(this.state.authForm)) {
      formCopy[key] = { ...this.state.authForm[key], touched: true };
      if (value.validation.required && !value.isValid) {
        formFilled = false;
      }
    }

    if (formFilled) {
      this.props.onAuth(
        this.state.authForm.email.value,
        this.state.authForm.password.value,
        this.state.isSignIn
      );
    } else {
      this.setState({ authForm: formCopy });
    }
  };

  signSwitchHandler = () => {
    console.log('Hi');
    this.setState({ isSignIn: !this.state.isSignIn });
  };

  render() {
    let authFormArr = [];
    for (let [key, value] of Object.entries(this.state.authForm)) {
      authFormArr.push(
        <Input
          key={key}
          {...value}
          changed={(event) => this.inputChangedHandler(event, key)}
        />
      );
    }
    let signText = 'Sign In';
    let switchText = 'Create account';
    if (!this.state.isSignIn) {
      signText = 'Sign Up';
      switchText = 'Sign in instead';
    }

    let form = (
      <>
        <h1 className={classes.SignText}>{signText}</h1>
        <form onSubmit={this.authHandler}>
          {authFormArr}
          <p className={classes.ErrorMessage}>{this.props.error}</p>
          <Button btnType='Success'>Continue</Button>
        </form>
        <Button btnType='Danger' clicked={this.signSwitchHandler}>
          {switchText}
        </Button>
      </>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let redirect = null;
    if (this.props.isAuth && this.props.ordering) {
      redirect = <Redirect to='/checkout' />;
    } else if (this.props.isAuth) {
      redirect = <Redirect to='/burger-builder' />;
    }

    return (
      <div className={classes.Auth}>
        {form}
        {redirect}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.userId !== null,
    building: state.burger.building,
    ordering: state.burger.ordering,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignIn) =>
      dispatch(actionCreators.auth(email, password, isSignIn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
