import Layout from "../dashboard/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IdentificationIcon,
  DocumentArrowDownIcon,
  UsersIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { dashboardPath } from "../api/path";
import CardSkeleton from "../dashboard/components/layout/CardSkeleton";

import { useSelector } from "react-redux";
import { userState } from "../store/userSlice";


const Home = () => {
  const [ordersCount, setOrdersCount] = useState(null);
  const [customersCount, setCustomersCount] = useState(null);
  const [paymentsCount, setPaymentsCount] = useState(null);
  const [requestsCount, setRequestsCount] = useState(null);

  const user = useSelector(userState);
  // const navigate = useNavigate();
  
  // if(user.data.role !== 1){
  //   navigate("/my-requests");
  // }

  useEffect(() => {

    axios
    .get(dashboardPath + "/count")
    .then(({ data }) => {
      setOrdersCount(data.data.orders);
      // if(user.data.role === 1){
        setCustomersCount(data.data.customers);
      // }else{

      // }
      
      setPaymentsCount(data.data.payments);
      setRequestsCount(data.data.requests);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    });

  }, []);

  return (
    <Layout
      title="Dashboard"
      content={
        <div>
          <div className="grid md:grid-cols-4 md:gap-4">
            

            {(customersCount !== null) ? (
              <NavLink to="/users" className="md:mx-2 my-2">
                <div className="bg-cyan-50 rounded-lg px-5 py-5 flex justify-between">
                  <div className="">
                    {(user.data.role === 1) ? (
                      <UsersIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                    <DocumentArrowDownIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                    )}
                    
                    <p>{(user.data.role === 1)?'Users':'Pending Requests'}</p>
                  </div>
                  <div className=" text-end height-full text-blue-600 text-4xl font-semibold my-auto">
                    {customersCount}
                  </div>
                </div>
              </NavLink>
            ) : (
              <CardSkeleton />
            )}
             {(requestsCount !== null) ? (
              <NavLink to="/requests" className="md:mx-2 my-2">
                <div className="bg-cyan-50 rounded-lg px-5 py-5 grid grid-cols-2">
                  <div className="">
                    <DocumentArrowDownIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                    <p>Requests</p>
                  </div>
                  <div className=" text-end height-full text-blue-600 text-4xl font-semibold my-auto">
                    {requestsCount}
                  </div>
                </div>
              </NavLink>
            ) : (
              <CardSkeleton />
            )}
            {(ordersCount !== null) ? (
              <NavLink to="/bookings" className="md:mx-2 my-2">
                <div className="bg-cyan-50 rounded-lg px-5 py-5 grid grid-cols-2">
                  <div className="">
                    <IdentificationIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                    <p>Bookings</p>
                  </div>
                  <div className=" text-end height-full text-blue-600 text-4xl font-semibold my-auto">
                    {ordersCount}
                  </div>
                </div>
              </NavLink>
            ) : (
              <CardSkeleton />
            )}

            {(paymentsCount !== null) ? (
              <NavLink to="/invoices" className="md:mx-2 my-2">
                <div className="bg-cyan-50 rounded-lg px-5 py-5 grid grid-cols-2">
                  <div className="">
                    <ClipboardDocumentIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                    <p>Invoices</p>
                  </div>
                  <div className=" text-end height-full text-blue-600 text-4xl font-semibold my-auto">
                    {paymentsCount}
                  </div>
                </div>
              </NavLink>
            ) : (
              <CardSkeleton />
            )}

           

          </div>
        </div>
      }
    />
  );
};

export default Home;
