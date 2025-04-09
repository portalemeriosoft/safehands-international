import CarbonSummary from "../../dashboard/components/reports/CarbonSummary.jsx";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CO2ReportPath } from "../../api/path";
import ReportSkeleton from "../../dashboard/components/layout/ReportSkeleton";

export default function Report() {
  const [report, setReport] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    axios.get(CO2ReportPath + "/" + id).then((response) => {
      if (response.data.status === "success") {
        setReport(response.data.data);
      }
    });
  }, []);

  const pages = [];

  return (
    <Layout
      title="CO2 Report"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page="CO2 Report" />
          </div>
          {report !== null ? (
            <CarbonSummary report={report} />
          ) : (
            <ReportSkeleton />
          )}
        </>
      }
    />
  );
}
