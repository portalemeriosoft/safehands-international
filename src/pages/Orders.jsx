import Layout from "../dashboard/Layout";
import OrdersTable from "../dashboard/components/OrdersTable";
import MobileOrdersTable from "../dashboard/components/MobileOrdersTable";
import Breadcrumb from "../dashboard/components/Breadcrumb";
import React, { useEffect, useState } from "react";

const Orders = () => {
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
      title="Orders"
      content={
        <div>
          <div className="mb-4">
            <Breadcrumb pages={[]} page="Orders" />
          </div>
          {isMobile ? <MobileOrdersTable /> : <OrdersTable />}
        </div>
      }
    />
  );
};

export default Orders;
