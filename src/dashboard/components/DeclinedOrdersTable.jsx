import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useRef } from "react";
import { orderPath } from "../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setdeclinedOrders, declinedOrdersState } from "../../store/declinedOrdersSlice";
import Moment from "moment";
import Order from "./Order";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../../utils";


const ColourCellRenderer = (props) => (
  <Link className="text-blue-600 py-5"
    to={"/order/" + props.data.id}  
  >{props.value}</Link>
);

const OrdersTable = () => {
  const orders = useSelector(declinedOrdersState);
  const dispatch = useDispatch();

  const orderId = useState(null);
  const gridRef = useRef();

  useEffect(() => {
    axios
      .get(orderPath+'/declined')
      .then(({ data }) => {
        dispatch(setdeclinedOrders(data.data));
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
      service: order.service.description,
      customer: order.customer.name,
      missionDate: Moment(order.start_task_datetime).format("DD-MMM-YY h:mm A"),
      total: "£" + order.payment.payable_amount,
      counterOffer: "£" + order.counter_offer,
      status: getOrderStatus(order.status),
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
    { field: "service", cellRenderer: ColourCellRenderer },
    { field: "customer" },
    { field: "missionDate" },
    { field: "total" },
    { field: "counterOffer" },
    { field: "status" },
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

export default OrdersTable;
