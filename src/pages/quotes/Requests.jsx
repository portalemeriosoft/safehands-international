import Layout from "../../dashboard/Layout";
import RequestsTable from "../../dashboard/components/booking/RequestsTable";
import MobileRequestsTable from "../../dashboard/components/booking/MobileRequestsTable";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import React, { useEffect, useState } from "react";

const Requests = () => {
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
      title="Requests"
      content={
        <div>
          <div className="mb-4">
            <Breadcrumb pages={[]} page="Requests" />
          </div>
          {isMobile ? <MobileRequestsTable /> : <RequestsTable />}
        </div>
      }
    />
  );
};

export default Requests;
