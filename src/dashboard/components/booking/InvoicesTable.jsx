import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useRef } from "react";
import { getBookings } from "../../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setBookings, bookingsState } from "../../../store/bookingsSlice";
import Moment from "moment";
import Order from "./Order";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ColourCellRenderer = (props) => (
  <Link className="text-blue-600 py-5"
    to={"/order/" + props.data.id}
  >{props.value}</Link>
);


const InvoicesTable = () => {
  const navigate = useNavigate();
  const bookings = useSelector(bookingsState);
  const dispatch = useDispatch();

  const orderId = useState(null);
  const gridRef = useRef();

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

  let bookingRow = null;

  console.log(bookings)
  if (bookings) {
    bookingRow = bookings.map((booking) => ({
      id: booking.booking.request_id,
      bookerName: booking.booking.booker_name,
      bookerEmail: booking.booking.booker_email,
      amount: 'AED '+ booking.amount,
      passengerName: booking.booking.passenger_name,
      passengerContact: booking.booking.passenger_contact,
      claimReference: booking.booking.claim_reference,
      specialRequirements: (booking.booking.have_special_requirements) ? 'Yes' : 'No',
    }
    )
    );
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
    { field: "bookerName" },
    { field: "bookerEmail" },
    { field: "amount" },
    { field: "passengerName" },
    { field: "passengerContact" },
    { field: "claimReference" },
    { field: "specialRequirements" },
  ]);

  const onRowClicked = (event)=>{
    const clickedRowData = event.data;
    console.log(clickedRowData)
    navigate('/booking/'+clickedRowData.id, { state: {data: clickedRowData}} );
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

export default InvoicesTable;
