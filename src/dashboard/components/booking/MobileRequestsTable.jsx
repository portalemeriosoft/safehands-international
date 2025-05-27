import { useEffect } from "react";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { requestAllQuotePath } from "../../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setOrders, ordersState } from "../../../store/ordersSlice";
import Moment from "moment";
import { Link } from "react-router-dom";

const OrderList = ({ order }) => {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-semi-bold tracking-tight text-gray-600 dark:text-white">
      {order.date_of_transfer}
      </h5>
      <div>
        
        <p>Pick Up Time: {Moment(order.date_of_transfer+' '+order.pickup_time).format("h:mm A")}</p>
        <p>Flight Number: {order.flight}</p>
        <p>From: {order.pickup_locations}</p>
        <p>To: {order.drop_off_locations}</p>
        <p>Status: {order.status}</p>
        <Link
          to={"/request/" + order.request_id}
          className="flex w-full my-3 justify-center rounded-full bg-violet-950 px-3 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const MobileRequestsTable = () => {
  const orders = useSelector(ordersState);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(requestAllQuotePath)
      .then(({ data }) => {
        console.log(data.data)
        dispatch(setOrders(data.data));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {orders && (
        <div style={{ flex: "1 1 auto", height: "75vh" }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                itemData={orders}
                height={height}
                itemCount={orders.length}
                itemSize={300}
                width={width}
              >
                {({ data, index, style }) => {
                  return (
                    <div style={style}>
                      <OrderList order={data[index]} />
                    </div>
                  );
                }}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default MobileRequestsTable;
