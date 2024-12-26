import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordersState, setOrders } from "./../store/ordersSlice";
import OrderBrief from "./../dashboard/components/OrderBrief";
import { useParams } from "react-router-dom";
import Layout from "../dashboard/Layout";
import { orderPath } from "../api/path";
import axios from "axios";
import Breadcrumb from "../dashboard/components/Breadcrumb";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function  Order() {
  const orders = useSelector(ordersState);
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  let { orderId } = useParams();

  useEffect(() => {
    if (!orders) {
      axios
        .get(orderPath)
        .then(({ data }) => {
          dispatch(setOrders(data.data));
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.message);
          }
        });
    }
  }, [dispatch, orders]);

  if (order === null && orders !== null) {
    const [filteredOrder] = orders.filter((x) => x.id === orderId);
    setOrder(filteredOrder);
  }

  const pages = [
    {
      title: "Orders",
      path: "/orders",
    },
  ];

  return (
    <Layout
      title="Order Brief"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page="Order Brief" />
          </div>
          {order && order !== null ? (
            <OrderBrief order={order} setOrder={setOrder} />
          ) : (
            <Skeleton className="my-5" height={20} count={5} />
          )}
        </>
      }
    />
  );
}
