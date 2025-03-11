import Layout from "../../Layout";
// import OrdersTable from "../dashboard/components/OrdersTable";
// import MobileOrdersTable from "../dashboard/components/MobileOrdersTable";
import Breadcrumb from "./Breadcrumb";
import React, { useEffect, useState } from "react";

const Invoice = () => {
  return (
    <Layout
      title="Invoice"
      content={
        <div>
          <div className="mb-4">
            <Breadcrumb pages={[]} page="Invoice" />
          </div>
          {/* {isMobile ? <MobileOrdersTable /> : <OrdersTable />} */}
          <h1>Hey!</h1>
        </div>
      }
    />
  );
};

export default Invoice;
