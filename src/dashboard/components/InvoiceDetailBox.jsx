import { useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../../store/userSlice";
import { Link } from "react-router-dom";

const InvoiceDetailBox = (rowData) => {
  const user = useSelector(userState);
  const {claimReferenceNumber, insurance, passengerContactNumber,passengerEmail,passengerName,
    typeOfTransfer, specialRequirements, bookerContact,bookerName
  } = rowData.rowData

  console.log(rowData.rowData)


  return (
    <>
      <div className="booking-details border-5">
      <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Booking Amount</div>
            <div>AED 250</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Claim Reference Number</div>
            <div>{claimReferenceNumber}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Insurance</div>
            <div>{insurance}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Passenger Name</div>
            <div>{passengerName}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Passenger Email</div>
            <div>{passengerEmail}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Passenger Contact Number</div>
            <div>{passengerContactNumber}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Type Of Transfer</div>
            <div>{typeOfTransfer}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Special Requirements</div>
            <div>{specialRequirements}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Booker Name</div>
            <div>{bookerName}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Booker Contact</div>
            <div>{bookerContact}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Date Of Transfer</div>
            <div>2024-02-02</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Pick Up Time</div>
            <div>28-Dec-24 9:40 PM</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Flight Number</div>
            <div>EK202</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>From</div>
            <div>Heathrow Airport, London</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>To</div>
            <div>The Ritz London</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Passengers</div>
            <div>3</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Suitcase</div>
            <div>5</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <button
          className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
          >
          Print Invoice
        </button>
      </div>


    </>
  );
};

export default InvoiceDetailBox;
