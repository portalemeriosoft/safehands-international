import { useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import RejectQuoteModal from "./RejectQuoteModal";
import SendQuoteModal from "./SendQuoteModal";
import AcceptQuoteModal from "./AcceptQuoteModal";

const SpecificRequestBox = ({request, setFetchRequestCount}) => {
  
  const user = useSelector(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [isRejectQuoteOpen, setIsRejectQuoteOpen] = useState(false);
  const [isAcceptQuoteOpen, setIsAcceptQuoteOpen] = useState(false);
  const navigate = useNavigate();

  


  const acceptQuote = ()=>{
    navigate("/booking-detail");
    // request.status = 2;
  }

  console.log(user);
  return (
    <>
      <div className="booking-details border-5">
      
      {(user.data.role === 1) && (
        <>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Customer</div>
            <div>
              {request.customer.name+' '} 
              (<a className="text-blue-500" href={"mailto:"+request.customer.email} target="_blank" rel="noreferrer">{request.customer.email}</a>)
            </div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Customer Phone</div>
            <div>
              {'+'+request.customer.dialling_code +' '+ request.customer.phone}</div>
          </div>
        </div>
        </>
      )}

      {(request.status_code > 0) && (
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Quote Amount</div>
            <div>{request.currency.toUpperCase()} {request.amount}</div>
          </div>
        </div>
      )}

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Status</div>
            <div>{request.request_status}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Date Of Transfer</div>
            <div>{moment(request.date_of_transfer).format("MMM Do YY")}</div>
          </div>
        </div>


        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Pick Up Time</div>
            <div>{moment(request.date_of_transfer+' '+request.pickup_time).format("hh:mm A")}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Flight Number</div>
            <div>{request.flight}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Claim Reference</div>
            <div>{request.claim_reference}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Locations</div>
            <div>
            
              {<>From {request.pickup_locations[0]} To {request.drop_off_locations[0]}</>}
              {(request.pickup_locations[1] && request.pickup_locations[1] !== '') && 
              (<><br />From {request.pickup_locations[1]} To {request.drop_off_locations[1]}</>)}
              {(request.pickup_locations[2] && request.pickup_locations[2] !== '') && 
              (<><br />From {request.pickup_locations[2]} To {request.drop_off_locations[2]}</>)}
            
            </div>
          </div>
        </div>
        
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Type Of Vehicle</div>
            <div>{request.type_of_vehicle.type}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Passengers</div>
            <div>{request.no_of_passengers}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Suitcase</div>
            <div>{request.no_of_suitcases}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Request Time</div>
            <div>{moment(request.created_at).format("hh:mm A DD-MMM-YYYY")}</div>
          </div>
        </div>

        
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Uploaded File</div>
            <div>
              <a className="text-blue-600" href={request.file} target="_blank" rel="noreferrer" download={request.file_name}>
                {request.file_name}
              </a>
            </div>
          </div>
        </div>

        
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Additional Details</div>
            <div>{request.additional_details}</div>
          </div>
        </div>
        
        {(request.status_code === 3) && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Customer Feedback</div>
              <div>{request.rejected_quote_feedback}</div>
            </div>
          </div>
        )}

      </div>

      {(user && user.data && user.data.role === 1 && request.status_code === 0) && (
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

      {(user && user.data && user.data.role === 2 && request.status_code === 2) && (
        <div>
          <div className="flex justify-end pt-2">
            <button
              className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
              onClick={() => navigate('/booking-detail/'+request.request_id)}
            >
              Add Booking Details
            </button>
          </div>
        </div>
      )}


      {(user && user.data && user.data.role === 2 && request.status_code === 1) && (
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

      {(user && user.data && user.data.role === 3 && request.amount !== null) && (
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
     
    </>
  );
};

export default SpecificRequestBox;