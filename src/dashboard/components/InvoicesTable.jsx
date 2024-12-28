import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useRef } from "react";
import { paymentsPath } from "../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPayments, paymentsState } from "../../store/paymentsSlice";
import Order from "./Order";
import { Link } from "react-router-dom";
import invoices from "../../utils/invoices.json"
import { useNavigate } from "react-router-dom";

const ColourCellRenderer = (props) => (
  <Link className="text-blue-600 py-5"
    to={"/order/" + props.data.id}
  >{props.value}</Link>
);


const InvoicesTable = () => {
  const navigate = useNavigate();
  const orders = useSelector(paymentsState);
  const orderId = useState(null);
  const gridRef = useRef();

  
  let invoiceRow = null;


  if (orders) {
    invoiceRow = invoices.map((booking) => ({
      claimReferenceNumber: booking.claimReferenceNumber,
      insurance: booking.insuranceOrClientReference,
      Amount: "AED 250",
      passengerName: booking.leadPassenger.name,
      passengerEmail: booking.leadPassenger.email,
      passengerContactNumber: booking.leadPassenger.contactNumber,
      typeOfTransfer: booking.typeOfTransfer,
      specialRequirements: booking.specialRequirements,
      bookerName: booking.bookerDetails.name,
      bookerContact: booking.bookerDetails.contactDetails,
    }
    )
    );
  }

  const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 120,
    columnLimits: [
      // {
      //   colId: "amount",
      //   minWidth: 140,
      // },
    ],
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", hide: true },
    { field: "claimReferenceNumber" , hide: true},
    { field: "insurance" },
    { field: "amount" },
    { field: "passengerName" },
    { field: "passengerEmail" , hide: true},
    { field: "passengerContactNumber" },
    { field: "typeOfTransfer" , hide: true},
    { field: "specialRequirements" },
    { field: "bookerName" },
    { field: "bookerContact" },
  ]);

  const onRowClicked = (event) => {
    const clickedRowData = { ...event.data };

    navigate('/invoice', { state: { data: clickedRowData } });
  }

  return (
    <div className="ag-theme-quartz" style={{ height: 'calc(100vh - 268px)' }}>
      <AgGridReact
        rowData={invoiceRow}
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
