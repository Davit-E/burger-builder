import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
  state = {
    orderForm: {
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
    },
    loading: false,
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: 'smooth' });
  };

  checkValidity = (value, rules) => {
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

  orderHandler = (event) => {
    event.preventDefault();
    let formFilled = true;
    let formCopy = { ...this.state.orderForm };

    for (const [key, value] of Object.entries(this.state.orderForm)) {
      formCopy[key] = { ...this.state.orderForm[key], touched: true };
      if (value.validation.required && !value.isValid) {
        formFilled = false;
      }
    }

    if (formFilled) {
      let orderForm = {};
      for (const key in this.state.orderForm) {
        orderForm[key] = this.state.orderForm[key].value;
      }
      this.setState({ loading: true });

      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price.toFixed(2),
        orderData: orderForm,
      };

      axios
        .post('/orders.json', order)
        .then((res) => {
          console.log(res);
          this.setState({ loading: false });
          this.props.history.push('/');
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
        });
    } else {
      this.setState({ orderForm: formCopy });
    }
  };

  inputChangedHandler = (event, inputKey) => {
    let value = event.target.value;
    this.setState((prevState) => {
      let isValid = this.checkValidity(
        value,
        prevState.orderForm[inputKey].validation
      );
      return {
        orderForm: {
          ...prevState.orderForm,
          [inputKey]: {
            ...prevState.orderForm[inputKey],
            value,
            isValid,
            touched: true,
          },
        },
      };
    });
  };

  render() {
    let orderFormArr = [];
    for (let [key, value] of Object.entries(this.state.orderForm)) {
      orderFormArr.push(
        <Input
          key={key}
          {...value}
          changed={(event) => this.inputChangedHandler(event, key)}
        />
      );
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {orderFormArr}
        <Button btnType="Success">Order</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div id="ContactData" className={classes.ContactData}>
        <h4>Enter your contact info:</h4>
        {form}
        <div
          ref={(el) => {
            this.el = el;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);
