import BookingDetailBox from "../../dashboard/components/booking/BookingDetailBox";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { requestQuotePath } from "../../api/path";

export default function BookingDetail() {
          
  const pages = [];
  const { request_id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios.get(requestQuotePath + "/" + request_id).then((response) => {
      if (response.data.status === "success") {
        setRequest(response.data.data);
      }
    });
  }, [request_id]);

  return (
    <Layout title="Booking Request" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Booking Request"/>
         </div>
         {(request !== null) && (
           <BookingDetailBox request={request}/>
         )}
      </>
    } />
  );
}
