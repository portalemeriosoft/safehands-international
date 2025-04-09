import { useEffect } from "react";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { getBookings } from "../../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPayments, paymentsState } from "../../../store/paymentsSlice";
import { setBookings, bookingsState } from "../../../store/bookingsSlice";
import { Link } from "react-router-dom";
import Moment from "moment";


const PaymentList = ({ payment }) => {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-semi-bold tracking-tight text-gray-600 dark:text-white">
      {payment.booker_name}
      </h5>
      <div>
        <p>Booker Email: {payment.booker_email}</p>
        <p>Date Of Transfer: {payment.date_of_transfer}</p>
        <p>Passenger Name: {payment.passenger_name}</p>
        <p>Passenger Contact: {payment.passenger_contact}</p>
        <p>Claim Reference: {payment.claim_reference}</p>
        <p>Special Requirements: {payment.have_special_requirements ? 'Yes' : 'No'}</p>
        <Link
          to={"/booking/" + payment.request_id}
          className="flex w-full my-3 justify-center rounded-full bg-violet-950 px-3 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const MobilePaymentsTable = () => {
  const payments = useSelector(bookingsState);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(getBookings)
      .then(({ data }) => {
        dispatch(setBookings(data.data));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {payments && (
        <div style={{ flex: "1 1 auto", height: "75vh" }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                itemData={payments}
                height={height}
                itemCount={payments.length}
                itemSize={300}
                width={width}
              >
                {({ data, index, style }) => {
                  return (
                    <div style={style}>
                      <PaymentList payment={data[index]} />
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

export default MobilePaymentsTable;
