import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { requestQuotePath, getAllVehicles } from "../../../api/path";
import axios from "axios";
import { useEffect, useState } from "react";
import UploadFile from "./../layout/UploadFile";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../store/notificationSlice";

const QuoteRequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  // const [error, setError] = useState("Tnvalid Fields");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let initialValues = {
    pick_up_1: "",
    pick_up_2: "",
    pick_up_3: "",
    drop_off_1: "",
    drop_off_2: "",
    drop_off_3: "",
    file_1: "",
    number_of_suitcase: "",
    number_of_passengers: "",
    date_of_transfer: "",
    pick_up_time: "",
    claim_reference: "",
    flight_number: "",
    type_of_vehicle: 0,
    additional_detail: "",
    terms_accepted: false,
  };

  useEffect(() => {
    axios.get(getAllVehicles).then(function (response) {
      if (response.data.status === "success") {
        setVehicles(response.data.data);
      }
    });
  }, []);

  const handleRequestSubmit = (formValues) => {
    // setError('');
    const pickup_locations = [formValues.pick_up_1];

    if (formValues.pick_up_2 !== "") {
      pickup_locations.push(formValues.pick_up_2);
    }

    if (formValues.pick_up_2 !== "" && formValues.pick_up_3 !== "") {
      pickup_locations.push(formValues.pick_up_3);
    }

    const dropOff_locations = [formValues.drop_off_1];

    if (formValues.drop_off_2 !== "") {
      dropOff_locations.push(formValues.drop_off_2);
    }

    if (formValues.drop_off_2 !== "" && formValues.drop_off_3 !== "") {
      dropOff_locations.push(formValues.drop_off_3);
    }
    console.log(formValues.type_of_vehicle);
    const formdata = new FormData();
    formdata.append("date_of_transfer", formValues.date_of_transfer);
    formdata.append("pickup_time", formValues.pick_up_time);
    formdata.append("flight", formValues.flight_number);
    formdata.append("claim_reference", formValues.claim_reference);
    formdata.append("type_of_vehicle", formValues.type_of_vehicle);
    formdata.append("pickup_locations", pickup_locations);
    formdata.append("file", formValues.file_1);
    formdata.append("drop_off_locations", dropOff_locations);
    formdata.append("no_of_passengers", formValues.number_of_passengers);
    formdata.append("no_of_suitcases", formValues.number_of_suitcase);
    formdata.append("additional_details", formValues.additional_detail);
    formdata.append("terms_accepted", formValues.terms_accepted);
    console.log(formValues.file_1);
    setLoading(true);
    axios
      .post(requestQuotePath, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        dispatch(setNotification(["success", "Request sent successfully"]))
        setLoading(false);
        console.log(data.data);
        navigate("/request/" + data.data.request_id);
      })
      .catch(function (error) {
        if (error.response) {
          setLoading(false);
          toast.error(error.response.data.message, {
            position: "bottom-center",
          });
        }
      });
  };

  const SignupSchema = Yup.object().shape({
    pick_up_1: Yup.string().required("Pick Up Location (1) is required"),
    drop_off_1: Yup.string().required("Drop Off Location (1) is required"),
    number_of_suitcase: Yup.number().required(
      "Number Of Suitcases are required"
    ).positive("Number of Suitcases must be a positive number")
    .max(20, "Number of Suitcases cannot be more than 20"),
    number_of_passengers: Yup.number().required(
      "Number Of Passengers are required"
    ).positive("Number of Passengers must be a positive number")
    .max(20, "Number of Passengers cannot be more than 20"),
    pick_up_time: Yup.string().required("Pick Up Time is required"),
    flight_number: Yup.string().required("Flight Number is required"),
    claim_reference: Yup.string().required("Claim Reference is required"),
    date_of_transfer: Yup.string().required("Date Of Transfer is required"),
    terms_accepted: Yup.bool().oneOf(
      [true],
      "You need to accept the terms and conditions"
    ),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleRequestSubmit(values);
        }}
      >
        {({ setFieldValue, values, errors, touched, handlechange }) => (
          <Form>
            <div className="max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="date"
                    name="date_of_transfer"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Date Of Transfer
                  </label>
                  <ErrorMessage
                    name="date_of_transfer"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="time"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    name="pick_up_time"
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Pick Up Time
                  </label>
                  <ErrorMessage
                    name="pick_up_time"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                {/* <div className="grid md:grid-cols-2 md:gap-6">

                  <div className="grid md:grid-cols-1 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        readOnly

                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Dialling code
                      </label>
                    </div>
                  </div>
                </div> */}

                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      type="tel"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      name="flight_number"
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Flight Number
                    </label>
                    <ErrorMessage
                      name="flight_number"
                      component="div"
                      className="mt-1 text-xs text-red-600 dark:text-red-500"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      type="tel"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      name="claim_reference"
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Claim Reference
                    </label>
                    <ErrorMessage
                      name="claim_reference"
                      component="div"
                      className="mt-1 text-xs text-red-600 dark:text-red-500"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      as="select"
                      name="type_of_vehicle"
                      className="block w-full appearance-none bg-transparent border-b-2 border-gray-300 py-2.5 ps-0 pe-4 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600"
                    >
                      {vehicles.map((vehicle, ind) => (
                        <option key={ind} value={ind}>
                          &nbsp; {vehicle.type}
                        </option>
                      ))}
                    </Field>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Type of Vehicle
                    </label>
                    <div className="absolute inset-y-0 right-0 flex items-center  pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-4 mb-8" />

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    name="pick_up_1"
                  />
                  <label
                    htmlFor="pick_up_1"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Pick Up Location (1)
                  </label>
                  <ErrorMessage
                    name="pick_up_1"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    name="drop_off_1"
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Drop Off Location (1)
                  </label>
                  <ErrorMessage
                    name="drop_off_1"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
              </div>
              {values.pick_up_1 && values.drop_off_1 && (
                <>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        name="pick_up_2"
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Pick Up Location (2)
                      </label>
                      <ErrorMessage
                        name="pick_up_2"
                        component="div"
                        className="mt-1 text-xs text-red-600 dark:text-red-500"
                      />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        name="drop_off_2"
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Drop Off Location (2)
                      </label>
                      <ErrorMessage
                        name="drop_off_2"
                        component="div"
                        className="mt-1 text-xs text-red-600 dark:text-red-500"
                      />
                    </div>
                  </div>
                </>
              )}
              {values.pick_up_2 && values.drop_off_2 && (
                <>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        name="pick_up_3"
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Pick Up Location (3)
                      </label>
                      <ErrorMessage
                        name="pick_up_3"
                        component="div"
                        className="mt-1 text-xs text-red-600 dark:text-red-500"
                      />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        name="drop_off_3"
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Drop Off Location (3)
                      </label>
                      <ErrorMessage
                        name="drop_off_3"
                        component="div"
                        className="mt-1 text-xs text-red-600 dark:text-red-500"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="number"
                    name="number_of_passengers"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    min="1"
                    max="20"
                    step="1"
                    autocomplete="off"
                    autocorrect="off"
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Number Of Passengers
                  </label>
                  <ErrorMessage
                    name="number_of_passengers"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    name="number_of_suitcase"
                    min="1"
                    max="20"
                    step="1"
                    autocomplete="off"
                    autocorrect="off"
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Number Of Suitcase
                  </label>
                  <ErrorMessage
                    name="number_of_suitcase"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 mt-1 group">
                  <UploadFile
                    data={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                  <ErrorMessage
                    name="file_1"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-1 md:gap-2">
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="about"
                    className="block text-sm/6  text-gray-500"
                  >
                    Additional detail
                  </label>
                  <div className="mt-2">
                    <Field
                      as="textarea"
                      name="additional_detail"
                      rows="5"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="additional_detail"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
              </div>

              <label className="min-w-0 flex-1 text-gray-500 text-sm">
                <div className="flex shrink-0 items-start">
                  <div className="flex h-5 shrink-0 items-start pr-2 pt-1">
                    <div className="group grid size-4 grid-cols-1">
                      <Field type="checkbox" name="terms_accepted" />
                    </div>
                  </div>
                  Please note any cancellation for a transfer booked in the UK
                  less than 6 hours before the scheduled pick-up time will incur
                  the full charges quoted. For transfers booked anywhere else in
                  the world, any cancellation less than 48 hours before the
                  scheduled pick-up time will incur the full charges quoted.
                </div>
              </label>

              {errors.terms_accepted && (
                <div className="mt-1 text-xs text-red-600 dark:text-red-500">
                  {errors.terms_accepted}
                </div>
              )}
            </div>

            {/* {error && error !== "" && (
              <div className="mt-1 text-xs text-red-600 dark:text-red-500">
                {error}
              </div>
            )} */}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                className="mt-2 rounded-full bg-stone-200 px-10 p-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Back
              </button>
              <button
                type="submit"
                className="ml-2 mt-2 rounded-full bg-violet-950 px-10 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Sending.." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default QuoteRequestForm;
