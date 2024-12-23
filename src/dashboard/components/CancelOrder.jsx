import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import axios from "axios";
import { orderCancelPath } from "./../../api/path";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { setOrder } from "./../../store/ordersSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function CancelOrder({
  order_id,
  setOrderBrief,
  cancelBookingConfirmation,
}) {
  const [terms, setTerms] = useState(false);
  const [error, seteErorr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const handleChange = (e) => {
    setTerms(current => !current);
    seteErorr("");
  };

  const setStatus = () => {
    const formData = new FormData();
    formData.append("order_id", order_id);
    
    if (!terms) {
      seteErorr("Please accept the terms.");
      return;
    } else {
      formData.append("cancellation_terms", terms);
    }
    setLoading(true);

    axios
      .post(orderCancelPath, formData)
      .then(({ data }) => {
        cancelBookingConfirmation[1](false);
        dispatch(setOrder(data.data));
        console.log(data.data);
        setOrderBrief(data.data);
        setLoading(false);
        toast.success("Booking cancelled successfully");
      })
      .catch(function (error) {
        if (error.response) {
          setLoading(false);
          seteErorr(error.response.data.message);
        }
      });
  };

  return (
    <Transition.Root show={cancelBookingConfirmation[0]} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={cancelBookingConfirmation[1]}
      >
        <Transition.Child
          as={Fragment}
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
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h2"
                        className="text-xl mb-2 font-semibold leading-6 text-gray-900"
                      >
                        Order Cancellation
                      </Dialog.Title>
                      <hr />
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to cancel this booking. This
                          action cannot be undone.
                        </p>
                        <div className="flex align-middle	mt-2">
                          <input
                            defaultChecked={terms}
                            id="accept_terms"
                            type="checkbox"
                            name="accept_terms"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="accept_terms"
                            className="ml-1 mt-0.5 text-sm text-gray-500"
                          >
                            Please accept our
                            <Link
                              to="/terms"
                              className="text-indigo-500 cursor-pointer"
                            >
                              {" "}
                              terms and policies.
                            </Link>
                          </label>
                        </div>
                        {error && error !== "" && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <ExclamationTriangleIcon
                              className="inline-block h-5 w-5 pr-1"
                              aria-hidden="true"
                            />
                            {error}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={setStatus}
                  >
                    {loading ? (
                      <>
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>{" "}
                        <span className="pl-2">Sending..</span>
                      </>
                    ) : (
                      "Confirm"
                    )}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => cancelBookingConfirmation[1](false)}
                    ref={cancelButtonRef}
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
}
