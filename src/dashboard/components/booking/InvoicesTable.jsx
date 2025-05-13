import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useRef } from "react";
import { getInvoices } from "../../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setInvoices, invoicesState } from "../../../store/invoicesSlice";
import Order from "./Order";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import PaymentStatus from "../layout/PaymentStatus";


const PaymentInoiceCell = (props) => {
  return props.value;
}

const InvoicesTable = () => {
  const navigate = useNavigate();
  const invoices = useSelector(invoicesState);
  const dispatch = useDispatch();

  const orderId = useState(null);
  const gridRef = useRef();

  useEffect(() => {
    axios
      .get(getInvoices)
      .then(({ data }) => {
        dispatch(setInvoices(data.data));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
  }, []);

  let invoiceRow = null;

  if (invoices) {
    invoiceRow = invoices.map((invoice) => ({
      id: invoice.booking.request_id,
      bookerName: invoice.booking.booker_name,
      bookerEmail: invoice.booking.booker_email,
      amount: "GBP " + invoice.quote_request.amount,
      passengerName: invoice.booking.passenger_name,
      passengerContact: invoice.booking.passenger_contact,
      invoiceStatus: <PaymentStatus date_of_transfer={invoice.booking.date_of_transfer} status={invoice.status} />,
      createdAt: moment(invoice.created_at).format("DD-MMM-YY hh:mm A"),
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

  const [colDefs] = useState([
    { field: "id", hide: true },
    { field: "bookerName" },
    { field: "bookerEmail" },
    { field: "amount" },
    { field: "passengerName" },
    { field: "passengerContact" },
    { field: "invoiceStatus", cellRenderer: PaymentInoiceCell },
    { field: "createdAt" },
  ]);

  const onRowClicked = (event) => {
    const clickedRowData = event.data;
    navigate("/invoice/" + clickedRowData.id);
  };

  return (
    <div className="ag-theme-quartz" style={{ height: "calc(100vh - 268px)" }}>
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
