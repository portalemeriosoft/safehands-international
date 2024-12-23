import React, { useEffect, useState } from "react";
import Layout from "../dashboard/Layout";
import OrdersTable from "../dashboard/components/DeclinedOrdersTable";
import Breadcrumb from "../dashboard/components/Breadcrumb";
import MobileDeclinedOrdersTable from "../dashboard/components/MobileDeclinedOrdersTable";

const DeclinedOrders = () => {
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
      title="Declined Orders"
      content={
        <div>
          <div className="mb-4">
            <Breadcrumb pages={[]} page="Declined Orders" />
          </div>
          {isMobile ? <MobileDeclinedOrdersTable /> : <OrdersTable />}
        </div>
      }
    />
  );
};

export default DeclinedOrders;
