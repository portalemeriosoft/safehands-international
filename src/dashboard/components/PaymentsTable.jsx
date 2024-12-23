import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useRef } from "react";
import { paymentsPath } from "../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPayments, paymentsState } from "../../store/paymentsSlice";
import Moment from "moment";
import Order from "./Order";
import { Link } from "react-router-dom";

const ColourCellRenderer = (props) => (
  <Link className="text-blue-600 py-5"
    to={"/order/" + props.data.id}  
  >{props.value}</Link>
);

const PaymentsTable = () => {
  const orders = useSelector(paymentsState);
  const dispatch = useDispatch();

  const orderId = useState(null);
  const gridRef = useRef();
  
  useEffect(() => {
    axios
      .get(paymentsPath)
      .then(({ data }) => {
        dispatch(setPayments(data.data));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
  }, []);

  let orderRow = null;

  if (orders) {
    orderRow = orders.map((order) => ({
      id: order.id,
      customer: order.customer,
      total: order.total_amount,
      paid: "£" + order.amount,
      transactions: order.total_transactions,
      date: Moment(order.created_at).format("DD-MMM-YY h:mm A"),
      description: order.description,
    }));
  }

  const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 120,
    columnLimits: [
      {
        colId: "service",
        minWidth: 290,
      },
    ],
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", hide: true },
    { field: "customer" },
    { field: "total" },
    { field: "paid" },
    { field: "transactions" },
    { field: "date" },
    { field: "description" },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 'calc(100vh - 237px)' }}>
      <AgGridReact
        rowData={orderRow}
        columnDefs={colDefs}
        ref={gridRef}
        pagination={true}
        rowSelection={"single"}
        autoSizeStrategy={autoSizeStrategy}
      />
      {orderId[0] && <Order orderId={orderId} />}
    </div>
  );
};

export default PaymentsTable;
