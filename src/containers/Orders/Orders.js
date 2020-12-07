import React, { useState, useEffect } from 'react';
import classes from './Orders.module.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Orders = () => {
  const [ordersList, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (token) {
      axios
        .get('/orders.json', {
          params: {
            auth: token,
            orderBy: '"userId"',
            equalTo: `"${userId}"`,
          },
        })
        .then((orders) => {
          let ordersArr = [];

          for (let [key, value] of Object.entries(orders.data)) {
            ordersArr.push({ id: key, ...value });
          }
          setOrders(ordersArr);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [token, userId]);

  let redirect = null;
  if (!token) {
    redirect = <Redirect to='burger-builder' />;
  }
  let orders = <Spinner />;

  if (!loading) {
    if (!ordersList.length) orders = <p>You haven't ordered yet</p>;
    else {
      orders = ordersList.map((order) => {
        return (
          <Order
            ingredients={order.ingredients}
            price={order.price}
            key={order.id}
          />
        );
      });
    }
  }
  return (
    <div className={classes.Orders}>
      {orders}
      {redirect}
    </div>
  );
};

export default withErrorHandler(Orders, axios);
