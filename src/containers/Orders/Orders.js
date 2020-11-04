import React, { Component } from 'react';
import classes from './Orders.module.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    if (this.props.token) {
      axios
        .get('/orders.json', {
          params: {
              auth: this.props.token,
              orderBy: '"userId"',
              equalTo: `"${this.props.userId}"`,
          }
        })
        .then((orders) => {
          let ordersArr = [];

          for (let [key, value] of Object.entries(orders.data)) {
            ordersArr.push({ id: key, ...value });
          }
          this.setState({ orders: ordersArr, loading: false });
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err);
        });
    }
  }

  render() {
    let redirect = null;
    if (!this.props.token) {
      redirect = <Redirect to='burger-builder' />;
    }
    let orders = <Spinner />;

    if (!this.state.loading) {
      orders = this.state.orders.map((order) => {
        return (
          <Order
            ingredients={order.ingredients}
            price={order.price}
            key={order.id}
          />
        );
      });
    }
    return (
      <div className={classes.Orders}>
        {orders}
        {redirect}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(withErrorHandler(Orders, axios));
