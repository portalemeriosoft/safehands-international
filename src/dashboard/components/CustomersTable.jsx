import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useCallback, useRef } from "react";
import { customersPath } from "../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCustomers, customersState } from "../../store/customersSlice";
import { Link } from "react-router-dom";
import { displayPhoneNumber, displayBillingAddress } from './../../utils'

const CustomersTable = () => {
  const customers = useSelector(customersState);
  const dispatch = useDispatch();

  const gridRef = useRef();

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

  let customerRow = null;

  const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 160,
    columnLimits: [
      {
        colId: "name",
        minWidth: 200,
      },
      {
        colId: "email",
        minWidth: 250,
      },
      {
        colId: "contactPriority",
        minWidth: 150,
      },
      {
        colId: "orders",
        minWidth: 80,
      },
      {
        colId: "billingAddress",
        minWidth: 350,
      },
    ],
  };

  if (customers) {
    customerRow = customers.map((customer) => ({
      id: customer,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      contactPriority: customer.contact_priority,
      orders: customer.orders,
      billingAddress: customer.billing_address,
    }));
  }

  const userLinkRenderer = (props) => {
    console.log(props.data.id)
    return (
      <Link className="text-blue-600 py-5"
        to={"/user/" + props.data.id.code}  
      >{props.value}</Link>
    ); 
  }

  const userPhoneRenderer = (props) => (
    displayPhoneNumber(props.data.id.dialling_code, props.data.id.phone)
  ); 

  const userAddressRenderer = (props) => (
    (props.data.id.billing_address) ? 
    displayBillingAddress(props.data.id.billing_address) : ''
  ); 



  const [colDefs, setColDefs] = useState([
    { field: "id", hide: true },
    { field: "name", cellRenderer: userLinkRenderer },
    { field: "email" },
    { field: "phone", cellRenderer: userPhoneRenderer },
    { field: "contactPriority" },
    { field: "orders" },
    { field: "billingAddress", cellRenderer: userAddressRenderer },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 'calc(100vh - 237px)' }}>
      <AgGridReact
        rowData={customerRow}
        columnDefs={colDefs}
        ref={gridRef}
        pagination={true}
        rowSelection={"single"}
        autoSizeStrategy={autoSizeStrategy}
      />
    </div>
  );
};

export default CustomersTable;
