import { useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../../../store/userSlice";
import moment from "moment";
import RejectBookingModal from "./RejectBookingModal";
import AcceptBookingModal from "./AcceptBookingModal";
import MarkCompletedModal from "./MarkCompletedModal";
import { Link } from "react-router-dom";

const SpecificRequestBox = ({ request, setFetchRequestCount }) => {
  const user = useSelector(userState);
  const [isRejectQuoteOpen, setIsRejectQuoteOpen] = useState(false);
  const [isAcceptQuoteOpen, setIsAcceptQuoteOpen] = useState(false);
  const [isMarkCompletedOpen, setIsMarkCompletedOpen] = useState(false);

  return (
    <>
      <div className="booking-details border-5">
        {request.status_code > 0 && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Quote Amount</div>
              <div>{request.currency.toUpperCase()} {request.amount}</div>
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
            <div>{request.request_status}</div>
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
              {
                <>
                  From {request.booking.pickup_locations[0]} To{" "}
                  {request.booking.drop_off_locations[0]}
                </>
              }
              {request.booking.pickup_locations[1] &&
                request.booking.pickup_locations[1] !== "" && (
                  <>
                    <br />
                    From {request.booking.pickup_locations[1]} To{" "}
                    {request.booking.drop_off_locations[1]}
                  </>
                )}
              {request.booking.pickup_locations[2] &&
                request.booking.pickup_locations[2] !== "" && (
                  <>
                    <br />
                    From {request.booking.pickup_locations[2]} To{" "}
                    {request.booking.drop_off_locations[2]}
                  </>
                )}
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
            <div>{request.booking.type_of_vehicle.type}</div>
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

        {request.booking.have_special_requirements &&
        request.booking.have_special_requirements !== 0 ? (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Special Requirements</div>
              <div>
                {request.booking.medical_requirement &&
                request.booking.medical_requirement !== "" ? (
                  <div>
                    Medical requirement:
                    {" " + request.booking.medical_requirement}
                  </div>
                ) : (
                  ""
                )} 
                {request.booking.requirements_medical_other && (
                  <div>
                    Medical requirement details:
                    {" " + request.booking.requirements_medical_other}
                  </div>
                )}

                {request.booking.luggage_requirement &&
                request.booking.luggage_requirement !== "" ? (
                  <div>
                    Specialist luggage requirement:
                    {" " +
                      request.booking.luggage_requirement}
                  </div>
                ) : (
                  ""
                )}
                {request.booking.requirements_specialist_luggage_other && (
                  <div>
                    Specialist luggage requirement details:
                    {" " + request.booking.requirements_specialist_luggage_other}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {request.booking ? (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Type of transfer</div>
              <div>
                {/* {request.booking.tt_medical === "Other" ? ( */}
                  {request.booking.type_of_transfer_medical_other && (
                  <div>
                    Medical:{" "}
                    {" " + request.booking.type_of_transfer_medical_other}
                  </div>
                  )}
                {/* ) : request.booking.tt_medical ? (
                  <div>Medical: {" " + request.booking.tt_medical}</div>
                ) : (
                  "" */}
                {/* )} */}

                {/* {request.booking.tt_non_medical === "Other" ? ( */}
                  {request.booking.type_of_transfer_non_medical_other && (
                  <div>
                    Non medical:{" "}
                    {" " + request.booking.type_of_transfer_non_medical_other}{" "}
                  </div>
                  )}
                {/* ) : request.booking.tt_non_medical ? (
                  <div>
                    Non medical:
                    {" " + request.booking.tt_non_medical}
                  </div>
                ) : (
                  ""
                )} */}
                {/* {request.booking.tt_curtailment === "Other" ? ( */}
                  {request.booking.type_of_transfer_curtailment_other && (
                  <div>
                    Curtailment:{" "}
                    {" " + request.booking.type_of_transfer_curtailment_other}{" "}
                  </div>
                  )}
                {/* ) : request.booking.tt_curtailment ? (
                  <div>
                    Curtailment:
                    {" " + request.booking.tt_curtailment}
                  </div>
                ) : (
                  ""
                )} */}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

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
            <div>
              {request.booking.additional_details &&
              request.booking.additional_details !== "" &&
              request.booking.additional_details !== "null"
                ? request.booking.additional_details
                : ""}
            </div>
          </div>
        </div>

        {request.status_code >= 5 && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {request.status_code === 6 ? "Cancelled " : "Accepted "} by
              </div>
              <div>
                {request.booking.accepted_or_cancelled_by_name !== "" &&
                request.booking.accepted_or_cancelled_by_name !== "null"
                  ? request.booking.accepted_or_cancelled_by_name + " "
                  : ""}
                on{" "}
                {moment(request.booking.accepted_or_cancelled_at).format(
                  "MMM Do YY"
                ) + " "}
                at{" "}
                {moment(request.booking.accepted_or_cancelled_at).format(
                  "hh:mm A"
                )}
              </div>
            </div>
          </div>
        )}

        {request.status_code === 6 && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Cancellation note</div>
              <div>
                {request.booking.cancellation_comments !== "" &&
                request.booking.cancellation_comments !== "null"
                  ? request.booking.cancellation_comments + " "
                  : ""}
              </div>
            </div>
          </div>
        )}
      </div>

      {user &&
        user.data &&
        user.data.role === 1 &&
        request.status_code === 4 && (
          <div>
            <div className="flex justify-end pt-2">
              <button
                className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
                onClick={() => setIsAcceptQuoteOpen(true)}
              >
                Accept Booking
              </button>

              <button
                className="rounded-full bg-gray-900 px-5 p-1.5 ml-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
                onClick={() => setIsRejectQuoteOpen(true)}
              >
                Cancel Booking
              </button>
            </div>
            <AcceptBookingModal
              id={request.id}
              request_id={request.request_id}
              setFetchRequestCount={setFetchRequestCount}
              isAcceptQuoteOpen={isAcceptQuoteOpen}
              setIsAcceptQuoteOpen={setIsAcceptQuoteOpen}
            />
            <RejectBookingModal
              request_id={request.id}
              setFetchRequestCount={setFetchRequestCount}
              isRejectQuoteOpen={isRejectQuoteOpen}
              setIsRejectQuoteOpen={setIsRejectQuoteOpen}
            />
          </div>
        )}

      {request.status_code >= 5 && request.status_code !== 6 && (
        <div className="flex justify-end pt-2 gap-1">
          <Link
            to={"/invoice/" + request.request_id}
            className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
          >
            View invoice
          </Link>
          {request.status_code === 7 && (
            <>
              <button
                className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
                onClick={() => setIsMarkCompletedOpen(true)}
              >
                Mark completed
              </button>
              <MarkCompletedModal
                id={request.id}
                request_id={request.request_id}
                setFetchRequestCount={setFetchRequestCount}
                isMarkCompletedOpen={isMarkCompletedOpen}
                setIsMarkCompletedOpen={setIsMarkCompletedOpen}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SpecificRequestBox;
