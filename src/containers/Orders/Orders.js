import React, { Component } from 'react';
import classes from './Orders.module.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
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

  render() {
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
    return <div className={classes.Orders}>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
