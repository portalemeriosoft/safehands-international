import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { getBookingCancelPath } from "../../../api/path";
import { toast } from "react-toastify";
import { setNotification } from "../../../store/notificationSlice";
import { useDispatch } from "react-redux";

const RejectBookingModal = ({ isRejectQuoteOpen, setIsRejectQuoteOpen, request_id, setFetchRequestCount}) => {
  
   const [quoteLoading, setQuoteLoading] = useState(false);
   const [quoteError, setQuoteError] = useState('');
   const [rejectedQuoteMsg, setRejectedQuoteMsg] = useState('');
   const dispatch = useDispatch();
  
   const handleSubmit = () => {
    
    setQuoteLoading(true);

    axios
      .post(getBookingCancelPath, {
        request_id: request_id,
        feedback: rejectedQuoteMsg,
      })
      .then(({ data }) => {
        console.log(data);
        setQuoteLoading(false);
        if (data.status === "success") {
         setIsRejectQuoteOpen(false);
         dispatch(setNotification(["success", "Request updated successfully"]))
         setFetchRequestCount((prevCount) => prevCount + 1);
        } else {
          setIsRejectQuoteOpen(false);
          toast.error(data.message);
          setFetchRequestCount((prevCount) => prevCount + 1);
        }
      })
      .catch((error) => {
        console.error("API Error:", error.response?.data || error.message);
      });
  };

  return (
    <Transition.Root show={isRejectQuoteOpen}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsRejectQuoteOpen(false)}
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h2"
                        className="text-xl mb-2 font-semibold leading-6 text-gray-900"
                      >
                        Confirm Booking Cancellation
                      </Dialog.Title>
                      
                      <div className="mt-2">
                        <div>
                          <div className="relative">
                            
                            Are you sure you want to cancel this booking? 
                            <br />
                            <label htmlFor="message" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              This action cannot be undone.
                            </label>
                            <textarea 
                            value={rejectedQuoteMsg}
                            onChange={(e) => {
                              setRejectedQuoteMsg(e.target.value);
                              setQuoteError("");
                            }}
                            id="message" rows="4" 
                            className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Any comments.."></textarea>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {quoteError && quoteError !== "" && (
                    <div className="mt-1 text-xs text-red-600 dark:text-red-500">
                      {quoteError}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center rounded-full bg-violet-950 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-800 sm:ml-3 sm:w-auto"
                  >
                    {quoteLoading ? "Sending.." : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsRejectQuoteOpen(false)}
                  >
                    Leave
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RejectBookingModal;
