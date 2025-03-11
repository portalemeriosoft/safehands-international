import BookkingDetailBox from "../../dashboard/components/booking/SpecificBooking";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBookingPath } from "../../api/path";
import TableSkeleton from "../../dashboard/components/layout/TableSkeleton";

export default function Booking() {
  const [booking, setBooking] = useState(null);
  const [fetchBookingCount, setFetchBookingCount] = useState(0);

  let { request_id } = useParams();

  useEffect(() => {
    axios.get(getBookingPath + "/" + request_id).then((response) => {
      if (response.data.status === "success") {
        setBooking(response.data.data);
      }
    });
  }, [fetchBookingCount]);

  const pages = [];

  return (
    <Layout
      title="Booking Detail"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page="Booking Detail" />
          </div>
          {booking !== null ? (
            <BookkingDetailBox
              request={booking}
              setFetchRequestCount={setFetchBookingCount}
            />
          ) : (
            <TableSkeleton />
          )}
        </>
      }
    />
  );
}
