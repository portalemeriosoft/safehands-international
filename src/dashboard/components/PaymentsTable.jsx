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
import bookings from "../../utils/bookings.json"
import { useNavigate } from "react-router-dom";

const ColourCellRenderer = (props) => (
  <Link className="text-blue-600 py-5"
    to={"/order/" + props.data.id}
  >{props.value}</Link>
);


const PaymentsTable = () => {
  const navigate = useNavigate();
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

  let bookingRow = null;

  console.log(bookings)

  if (orders) {
    bookingRow = bookings.map((booking) => ({
      claimReferenceNumber: booking.claimReferenceNumber,
      insurance: booking.insuranceOrClientReference,
      passengerName: booking.leadPassenger.name,
      passengerEmail: booking.leadPassenger.email,
      passengerContactNumber: booking.leadPassenger.contactNumber,
      typeOfTransfer: booking.typeOfTransfer,
      specialRequirements: booking.specialRequirements,
      bookerName: booking.bookerDetails.name,
      bookerContact: booking.bookerDetails.contactDetails,
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
    { field: "claimReferenceNumber" },
    { field: "insurance" },
    { field: "passengerName" },
    { field: "passengerEmail" },
    { field: "passengerContactNumber" },
    { field: "typeOfTransfer" },
    { field: "specialRequirements" },
    { field: "bookerName" },
    { field: "bookerContact" },
  ]);
  const onRowClicked = (event) => {
    const clickedRowData = event.data;

    navigate('/booking', { state: { data: clickedRowData } });
  }

  return (
    <div className="ag-theme-quartz" style={{ height: 'calc(100vh - 268px)' }}>
      <AgGridReact
        rowData={bookingRow}
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

export default PaymentsTable;
