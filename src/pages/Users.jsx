import React, { useEffect, useState } from "react";
import Layout from "../dashboard/Layout";
import CustomersTable from "../dashboard/components/CustomersTable";
import Breadcrumb from "../dashboard/components/Breadcrumb";
import MobileCustomersTable from "../dashboard/components/MobileCustomersTable";

const Users = () => {
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
      title="Users"
      addBtnTxt = "Add new user"
      addBtnPath = "/user/signup"
      content={
        <div>
          <div className="mb-4">
            <Breadcrumb pages={[]} page="Users" />
          </div>
          {isMobile ? <MobileCustomersTable /> : <CustomersTable />}
        </div>
      }
    />
  );
};

export default Users;
