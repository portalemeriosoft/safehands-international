import SpecificRequestBox from "../../dashboard/components/booking/SpecificRequestBox";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { requestQuotePath } from "../../api/path";
import TableSkeleton from "../../dashboard/components/layout/TableSkeleton";

export default function SpecificRequest() {

  const [request, setRequest] = useState(null);
  const [fetchRequestCount, setFetchRequestCount] = useState(0);
  

  let { request_id } = useParams();

  useEffect(() => {
    axios.get(requestQuotePath + "/" + request_id).then((response) => {
      if (response.data.status === "success") {
        setRequest(response.data.data);
      }
    });
  }, [fetchRequestCount]);

  const pages = [];

  return (
    <Layout
      title="Request"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page="Request" />
          </div>
          {
            (request !== null) ?
              <SpecificRequestBox request={request} setFetchRequestCount={setFetchRequestCount} />
            : <TableSkeleton />
          }
        </>
      }
    />
  )
}
