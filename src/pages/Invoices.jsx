// HomePage.js
import React, { useEffect, useState } from "react";
import Layout from "../dashboard/Layout";
import InvoiceTable from "../dashboard/components/InvoicesTable";
import Breadcrumb from "../dashboard/components/Breadcrumb";
import MobilePaymentsTable from "../dashboard/components/MobilePaymentsTable";

const HomePage = () => {
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
      title="Invoices"
      content={
        <div>
          <div className="mb-4">
            <Breadcrumb pages={[]} page="Invoices" />
          </div>
          {isMobile ? <MobilePaymentsTable /> : <InvoiceTable />}
        </div>
      }
    />
  );
};

export default HomePage;
