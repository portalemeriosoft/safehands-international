import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useCallback, useRef } from "react";
import { customersPath, getAllUsers } from "../../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCustomers, customersState } from "../../../store/customersSlice";
import { Link, useNavigate } from "react-router-dom";
import { displayPhoneNumber, getCountry } from '../../../utils'


const CustomersTable = () => {
  const customers = useSelector(customersState);
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);

  const gridRef = useRef();

  useEffect(() => {
    axios
      .get(getAllUsers)
      .then(({ data }) => {
        dispatch(setCustomers(data.data.users));
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
        colId: "country",
        minWidth: 250,
      },
      {
        colId: "role",
        minWidth: 150,
      },
      {
        colId: "status",
        minWidth: 150,
      },
    ],
  };


  if(customers){
    customerRow = customers.map((customer) => ({
      id: customer.hash,
      name: customer.name,
      email: customer.email,
      phone: '+'+customer.dialling_code+' '+customer.phone,
      country: getCountry(customer.country),
      role: (customer.role === 1) ? 'Admin' : 'Customer',
      status: (customer.status === 1) ? 'Active' : 'Inactive',
    }));

  }


  const userLinkRenderer = (props) => {

    return (
      <Link
        className="text-blue-600 py-5"
        to={`/user/${props.data.id}`}
        state={{ user: props.data }} 
      >
        {props.value}
      </Link>
    )
  };

  const userPhoneRenderer = (props) => (
    displayPhoneNumber(props.data.id.dialling_code, props.data.id.phone)
  );





  const [colDefs, setColDefs] = useState([
    { field: "id", hide: true },
    { field: "name", cellRenderer: userLinkRenderer },
    { field: "email" },
    { field: "country" },
    { field: "phone" },
    { field: "role" },
    { field: "status" },
  ]);

  return (
    <>
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) =>
          gridRef.current?.api?.setGridOption('quickFilterText', e.target.value)
        }
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <div className="ag-theme-quartz" style={{ height: 'calc(100vh - 268px)' }}>
        <AgGridReact
          rowData={customerRow}
          columnDefs={colDefs}
          ref={gridRef}
          pagination={true}
          rowSelection={"single"}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </>
  );
};

export default CustomersTable;
