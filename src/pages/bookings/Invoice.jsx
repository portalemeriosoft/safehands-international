import SpecificInvoiceBox from "../../dashboard/components/booking/SpecificInvoiceBox";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getInvoicePath } from "../../api/path";
import TableSkeleton from "../../dashboard/components/layout/TableSkeleton";

export default function Invoice() {
  const [invoice, setInvoice] = useState(null);
  const [fetchInvoiceCount, setFetchInvoiceCount] = useState(0);

  let { request_id } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(getInvoicePath + "/" + request_id).then((response) => {
      if (response.data.status === "success") {
        setInvoice(response.data.data);
      }
    }).catch((error) => {
      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 403) {
          setError("You don't have permission to access this invoice.");
        } else {
          setError(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong.'}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        setError("No response from server. Please try again.");
      } else {
        // Something else happened
        setError("An error occurred while fetching the invoice.");
      }
    });
  }, [fetchInvoiceCount, request_id]);

  const pages = [];

  return (
    <Layout
      title="Invoice Detail"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page="Invoice Detail" />
          </div>
          {(invoice !== null) ? (
            <SpecificInvoiceBox
              request={invoice}
              setFetchRequestCount={setFetchInvoiceCount}
            />
          ) : (error) ? (
            <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
              {error}
            </div>
          ) : (
            <TableSkeleton />
          )}
        </>
      }
    />
  );
}
