// HomePage.js
import React, { useEffect, useState } from "react";
import Layout from "../../dashboard/Layout";
import ReportsTable from "../../dashboard/components/reports/ReportsTable";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import MobilePaymentsTable from "../../dashboard/components/booking/MobilePaymentsTable";

const CarbonEmission = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check the initial screen size
    const checkScreenSize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // Add event listener for screen size changes
    window.addEventListener("resize", checkScreenSize);

    // Initial check
    checkScreenSize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <Layout
      title="Carbon Emission Reports"
      addBtnTxt = "Generate Report"
      addBtnPath = "/carbon-emission-report/generate"
      content={
        <div>
          <div className="mb-4">
            <Breadcrumb pages={[]} page="Carbon Emission Reports" />
          </div>
          {isMobile ? <MobilePaymentsTable /> : <ReportsTable />}
        </div>
      }
    />
  );
};

export default CarbonEmission;
