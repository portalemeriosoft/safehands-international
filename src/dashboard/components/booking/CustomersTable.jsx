import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useCallback, useRef } from "react";
import { customersPath, getAllUsers } from "../../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCustomers, customersState } from "../../../store/customersSlice";
import { Link, useNavigate } from "react-router-dom";
import { displayPhoneNumber } from '../../../utils'
import users from '../../../utils/users.json';


const CustomersTable = () => {
  const customers = useSelector(customersState);
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);

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

  useEffect(() => {
    axios
      .get(getAllUsers)
      .then(({ data }) => {
        setAllUsers(data.data.users);
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


  customerRow = allUsers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    country: customer.country,
    role: customer.role,
    status: customer.status,
  }));


  const userLinkRenderer = (props) => {

    return (
      <Link
        className="text-blue-600 py-5"
        to={`/user/${props.data.id}`}
        state={{ user: props.data }} 
      >
        {props.value}
      </Link>
    );
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
  );
};

export default CustomersTable;
