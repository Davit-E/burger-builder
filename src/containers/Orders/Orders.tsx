import React, { useState, useEffect } from 'react';
import classes from './Orders.module.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { OrderInterface } from '../../types/order_interface';
import { RootState } from '../../rootReducer';

interface Order extends OrderInterface{
  id: string;
}

const Orders = () => {
  const [ordersList, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);

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
          let ordersArr: Order[] = [];

          for (let [key, value] of Object.entries(orders.data)) {
            ordersArr.push({ ...(value as Order), id: key });
          }
          setOrders(ordersArr);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // console.log(err);
        });
    }
  }, [token, userId]);

  let redirect = null;
  if (!token) {
    redirect = <Redirect to='/burger' />;
  }
  let orders: React.FC | JSX.Element[] | JSX.Element = <Spinner />;

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
