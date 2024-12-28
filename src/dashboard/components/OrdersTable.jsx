import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useRef } from "react";
import { orderPath } from "../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setOrders, ordersState } from "../../store/ordersSlice";
import Moment from "moment";
import Order from "./Order";
import { Link, useNavigate } from "react-router-dom";
import { getOrderStatus } from "../../utils";
import requests from "../../utils/requests.json"

const ColourCellRenderer = (props) => (
  <Link className="text-blue-600 py-5"
    to={"/order/" + props.data.id}  
  >{props.value}</Link>
);

const OrdersTable = () => {
  const navigate = useNavigate();
  const orders = useSelector(ordersState);
  const dispatch = useDispatch();

  const orderId = useState(null);
  const gridRef = useRef();

  useEffect(() => {
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
  }, []);

  let requestRow = null;


  if (orders) {
    requestRow = requests.map((request) => ({
      id: request.id,
      dateOfTransfer: request.dateOfTransfer,
      pickUpTime: Moment(request.pickupTime).format("DD-MMM-YY h:mm A"),
      flightNumber: request.flightNumber,
      from: request.from,
      to: request.to,
      status: request.status,
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
    { field: "id", hide : true},
    { field: "dateOfTransfer"},
    { field: "pickUpTime" },
    { field: "flightNumber" },
    { field: "from" },
    { field: "to" },
    { field: "status" },
  ]);

  const onRowClicked = (event)=>{
    const clickedRowData = event.data;
    console.log(clickedRowData)
    navigate('/request', { state: {data: clickedRowData}} );
  }

  return (
    <div className="ag-theme-quartz" style={{ height: 'calc(100vh - 268px)' }}>
      <AgGridReact
        rowData={requestRow}
        columnDefs={colDefs}
        ref={gridRef}
        pagination={true}
        rowSelection={"single"}
        autoSizeStrategy={autoSizeStrategy}
        onRowClicked={onRowClicked}
      />
      {orderId[0] && <Order orderId={orderId} />}
    </div>
  );
};

export default OrdersTable;
