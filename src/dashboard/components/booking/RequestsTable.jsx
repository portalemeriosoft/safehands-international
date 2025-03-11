import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useRef } from "react";
import { requestAllQuotePath } from "../../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setOrders, ordersState } from "../../../store/ordersSlice";
import Moment from "moment";
import Order from "./Order";
import { Link, useNavigate } from "react-router-dom";

const ColourCellRenderer = (props) => (
  <Link className="text-blue-600 py-5"
    to={"/order/" + props.data.id}  
  >{props.value}</Link>
);

const RequestsTable = () => {
  const navigate = useNavigate();
  const orders = useSelector(ordersState);
  const dispatch = useDispatch();

  const orderId = useState(null);
  const gridRef = useRef();

  useEffect(() => {
    axios
      .get(requestAllQuotePath)
      .then(({ data }) => {
        console.log(data)
        dispatch(setOrders(data.data));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
  }, []);

  let requestRow = null;

  console.log(orders)
  if (orders) {
    requestRow = orders.map((request) => ({
      id: request.request_id,
      dateOfTransfer: Moment(request.date_of_transfer).format("DD-MMM-YYYY"),
      pickUpTime: Moment(request.date_of_transfer+' '+request.pickup_time).format("h:mm A"),
      flightNumber: request.flight,
      from: request.pickup_locations,
      to: request.drop_off_locations,
      status: request.status,
      numberOfSuitcase: request.no_of_suitcases,
      numberOfPassengers: request.no_of_passengers,
      typeOfVehicle: request.type_of_vehicle,
      amount: request.amount,
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
    { field: "numberOfSuitcase", hide : true},
    { field: "numberOfPassengers", hide : true},
    { field: "typeOfVehicle", hide : true},
    { field: "amount", hide : true},
    { field: "status", hide : true},
  ]);

  const onRowClicked = (event)=>{
    const clickedRowData = event.data;
    console.log(clickedRowData)
    navigate('/request/'+clickedRowData.id, { state: {data: clickedRowData}} );
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

export default RequestsTable;
