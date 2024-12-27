import { useState } from "react";

import { useSelector } from "react-redux";
import { userState } from "../../store/userSlice";
import { Link } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/24/outline";
import UpdatePassword from "./UpdatePassword";
import UpdateAvailability from "./UpdateAvailability";
import { displayPhoneNumber, displayBillingAddress } from "../../utils";
import Requests from "../../utils/requests.json"

const SpecificRequestBox = (rowData) => {
  const user = useSelector(userState);
  const {dateOfTransfer, pickUpTime, flightNumber, from, to, typeOfVehicle , numberOfPassengers , numberOfSuitcase} = rowData.rowData

  return (
    <>
      <div className="booking-details border-5">
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Date Of Transfer</div>
            <div>{dateOfTransfer}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Pick Up Time</div>
            <div>{pickUpTime}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Flight Number</div>
            <div>{flightNumber}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>From</div>
            <div>{from}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>To</div>
            <div>{to}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Type Of Vehicle</div>
            <div>{typeOfVehicle}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Passengers</div>
            <div>{numberOfPassengers}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Suitcase</div>
            <div>{numberOfSuitcase}</div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-end pt-2">
        <Link
          className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
          >
          Edit Request
        </Link>
      </div> */}


    </>
  );
};

export default SpecificRequestBox;
