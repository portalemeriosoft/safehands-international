import { useEffect } from "react";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { customersPath } from "../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCustomers, customersState } from "../../store/customersSlice";
import { Link } from "react-router-dom";

const CustomerList = ({ customer }) => {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-semi-bold tracking-tight text-gray-600 dark:text-white">
        {customer.name}
      </h5>
      <div>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
        <p>Contact priority: {customer.contact_priority}</p>
        <p>Total order: {customer.orders}</p>
        <p>Address: {customer.billing_address}</p>
        <Link
          to={"/customer/" + encodeURI(btoa(customer.id))}
          className="flex w-full my-3 justify-center rounded-full bg-violet-950 px-3 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const MobileCustomersTable = () => {
  const customers = useSelector(customersState);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(customersPath)
      .then(({ data }) => {
        dispatch(setCustomers(data.data));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {customers && (
        <div style={{ flex: "1 1 auto", height: "75vh" }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                itemData={customers}
                height={height}
                itemCount={customers.length}
                itemSize={300}
                width={width}
              >
                {({ data, index, style }) => {
                  return (
                    <div style={style}>
                      <CustomerList customer={data[index]} />
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

export default MobileCustomersTable;
