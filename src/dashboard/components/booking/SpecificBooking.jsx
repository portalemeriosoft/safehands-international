import { useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import RejectQuoteModal from "./RejectQuoteModal";
import SendQuoteModal from "./SendQuoteModal";
import AcceptQuoteModal from "./AcceptQuoteModal";

const SpecificRequestBox = ({ request, setFetchRequestCount }) => {
  const user = useSelector(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [isRejectQuoteOpen, setIsRejectQuoteOpen] = useState(false);
  const [isAcceptQuoteOpen, setIsAcceptQuoteOpen] = useState(false);
  const navigate = useNavigate();

  const acceptQuote = () => {
    navigate("/booking-detail");
    // request.status = 2;
  };

  return (
    <>
      <div className="booking-details border-5">
        {request.status_code > 0 && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Quote Amount</div>
              <div>AED {request.amount}</div>
            </div>
          </div>
        )}

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Booker Name</div>
            <div>{request.booking.booker_name}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Booker Email</div>
            <div>{request.booking.booker_email}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Claim Reference</div>
            <div>{request.booking.claim_reference}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Passenger Name</div>
            <div>{request.booking.passenger_name}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Passenger Contact</div>
            <div>{request.booking.passenger_contact}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Passenger Age</div>
            <div>{request.booking.age}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Insurance</div>
            <div>{request.booking.insurance}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Status</div>
            <div>{request.status}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Date Of Transfer</div>
            <div>
              {moment(request.booking.date_of_transfer).format("MMM Do YY")}
            </div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Pick Up Time</div>
            <div>
              {moment(
                request.booking.date_of_transfer +
                  " " +
                  request.booking.pickup_time
              ).format("hh:mm A")}
            </div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Flight Number</div>
            <div>{request.booking.flight}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Locations</div>
            <div>
            
              {<>From {request.booking.pickup_locations[0]} To {request.booking.drop_off_locations[0]}</>}
              {(request.booking.pickup_locations[1] && request.booking.pickup_locations[1] !== '') && 
              (<><br />From {request.booking.pickup_locations[1]} To {request.booking.drop_off_locations[1]}</>)}
              {(request.booking.pickup_locations[2] && request.booking.pickup_locations[2] !== '') && 
              (<><br />From {request.booking.pickup_locations[2]} To {request.booking.drop_off_locations[2]}</>)}
            
            </div>
          </div>
        </div>
        {/* <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>To</div>
            <div>{request.booking.drop_off_locations}</div>
          </div>
        </div> */}
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Type Of Vehicle</div>
            <div>
              {request.booking.type_of_vehicle.type}
            </div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Passengers</div>
            <div>{request.booking.no_of_passengers}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Suitcase</div>
            <div>{request.booking.no_of_suitcases}</div>
          </div>
        </div>

        {(request.booking.have_special_requirements && request.booking.have_special_requirements !== 0) ? (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Special Requirements</div>
              <div>
                {request.booking.medical_requirement &&
                request.booking.medical_requirement === "Other" ? (
                  <div>
                    Medical requirements:
                    {" " + request.booking.requirements_medical_other}
                  </div>
                ) : request.booking.medical_requirement ? (
                  <div>
                    Medical requirements:
                    {" " + request.booking.medical_requirement}
                  </div>
                ) : (
                  ""
                )}

                {request.booking.luggage_requirement &&
                request.booking.luggage_requirement === "Other" ? (
                  <div>
                    Specialist luggage:
                    {" " +
                      request.booking.requirements_specialist_luggage_other}
                  </div>
                ) : request.booking.luggage_requirement ? (
                  <div>
                    Specialist luggage:
                    {" " + request.booking.luggage_requirement}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : ''}

        {(request.booking) ? (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Type of transfer</div>
              <div>
                {request.booking.tt_medical === "Other" ? (
                  <div>Medical: { " " + request.booking.type_of_transfer_medical_other}</div>
                ) : (request.booking.tt_medical) ? (
                  <div>Medical: { " " + request.booking.tt_medical}</div>
                ) : ''}

                {request.booking.tt_non_medical ===
                "Other" ? (
                  <div>Non medical: { " " + request.booking.type_of_transfer_non_medical_other} </div>
                ) : (request.booking.tt_non_medical) ? (
                  <div>
                    Non medical:
                    { " " + request.booking.tt_non_medical}
                  </div>
                ) : ''}
                {request.booking.tt_curtailment ===
                "Other" ? (
                  <div>Curtailment: { " " + request.booking.type_of_transfer_curtailment_other} </div>
                ) : (request.booking.tt_curtailment) ? (
                  <div>
                    Curtailment:
                   { " " + request.booking.tt_curtailment}
                  </div>
                ): ''}
              </div>
            </div>
          </div>
        ): ''}

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Request Time</div>
            <div>
              {moment(request.booking.created_at).format("hh:mm A DD-MMM-YYYY")}
            </div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Uploaded File</div>
            <div>
              <a
                className="text-blue-600"
                href={request.booking.file}
                target="_blank"
                rel="noreferrer"
                download={request.booking.file_name}
              >
                {request.booking.file_name}
              </a>
            </div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Additional Details</div>
            <div>{(request.booking.additional_details) ? request.booking.additional_details : ''}</div>
          </div>
        </div>
      </div>

      {user &&
        user.data &&
        user.data.role === 1 &&
        request.status_code === 0 && (
          <div>
            <div className="flex justify-end pt-2">
              <button
                className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
                onClick={() => setIsOpen(true)}
              >
                Send Quote
              </button>
            </div>
            <SendQuoteModal
              request_id={request.id}
              setFetchRequestCount={setFetchRequestCount}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        )}

      {user &&
        user.data &&
        user.data.role === 2 &&
        request.status_code === 2 && (
          <div>
            <div className="flex justify-end pt-2">
              <button
                className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
                onClick={() =>
                  navigate("/booking-detail/" + request.request_id)
                }
              >
                Add Booking Details
              </button>
            </div>
          </div>
        )}

      {user &&
        user.data &&
        user.data.role === 2 &&
        request.status_code === 1 && (
          <div>
            <div className="flex justify-end pt-2">
              <button
                className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
                onClick={() => setIsAcceptQuoteOpen(true)}
              >
                Accept Quotation
              </button>

              <button
                className="rounded-full bg-gray-900 px-5 p-1.5 ml-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
                onClick={() => setIsRejectQuoteOpen(true)}
              >
                Reject Quotation
              </button>
            </div>
            <AcceptQuoteModal
              id={request.id}
              request_id={request.request_id}
              setFetchRequestCount={setFetchRequestCount}
              isAcceptQuoteOpen={isAcceptQuoteOpen}
              setIsAcceptQuoteOpen={setIsAcceptQuoteOpen}
            />
            <RejectQuoteModal
              request_id={request.id}
              setFetchRequestCount={setFetchRequestCount}
              isRejectQuoteOpen={isRejectQuoteOpen}
              setIsRejectQuoteOpen={setIsRejectQuoteOpen}
            />
          </div>
        )}

      {user && user.data && user.data.role === 3 && request.amount !== null && (
        <div>
          <div className="flex justify-end pt-2">
            <button
              className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
              onClick={acceptQuote}
            >
              Accept Quote
            </button>
          </div>
        </div>
      )}
      {user && user.data && user.data.role === 3 && request.status === 2 && (
        <div>
          <div className="flex justify-end pt-2">
            <button
              className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
              // onClick={acceptQuote}
            >
              Add Booking Details
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecificRequestBox;
