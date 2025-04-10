import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { requestBookingPath, getAllVehicles, getInsurances } from "../../../api/path";
import UploadFile from "./../layout/UploadFile";
import { toast } from "react-toastify";
import { setNotification } from "../../../store/notificationSlice";
import { useDispatch } from "react-redux";

const BookingDetailBox = ({ request }) => {

const [loading, setLoading] = useState(false);
const [vehicles, setVehicles] = useState([]);
const [uploadNew, setUploadNew] = useState(false);
const [insurances, setInsurances] = useState([]);
const dispatch = useDispatch();

const navigate = useNavigate()
  console.log(request)
  const initialValues = {
    booker_name: '',
    booker_email: '',
    passenger_name: '',
    passenger_contact_number: '',
    passenger_age: '',
    number_of_passengers: request.no_of_passengers,
    insurance: 0,
    have_special_requirements: [],
    requirement_options: [],
    luggage_requirement: '',
    medical_requirement: '',
    type_of_transfer: [],
    tt_medical: '',
    tt_non_medical: '',
    tt_curtailment: '',
    date_of_transfer: request.date_of_transfer,
    pick_up_time: request.pickup_time,
    number_of_suitcase: request.no_of_suitcases,
    pick_up_1: request.pickup_locations[0],
    pick_up_2: request.pickup_locations[1],
    pick_up_3: request.pickup_locations[2],
    drop_off_1: request.drop_off_locations[0],
    drop_off_2: request.drop_off_locations[1],
    drop_off_3: request.drop_off_locations[2],
    type_of_vehicle: request.type_of_vehicle_code,
    claim_reference: '',
    flight_number: request.flight,
    other_specialist_luggage_requirement: '',
    other_medical_requirement: '',
    other_medical_tot: '',
    other_non_medical_tot: '',
    other_curtailment_tot: '',
    additional_detail: request.additional_details,
    terms_accepted: false

  }

  const SignupSchema = Yup.object().shape({
    booker_name: Yup.string().required('Booker Name is required'),
    booker_email: Yup.string().email("Invalid Email").required('Booker Email is required'),
    passenger_name: Yup.string().required('Passenger Name is required'),
    passenger_contact_number: Yup.number().required('Passenger Contact Number is required'),
    passenger_age: Yup.number().required('Passenger Age is required'),
    number_of_passengers: Yup.number().required('Number Of Passengers is required').positive("Number of Passengers must be a positive number"),
    date_of_transfer: Yup.string().required('Date Of Transfer is required'),
    number_of_suitcase: Yup.number().required('Number Of Suitcase is required').positive("Number of Suitcase must be a positive number"),
    pick_up_time: Yup.string().required('Pick Up Time is required'),
    pick_up_1: Yup.string().required('Pick Up (1) is required'),
    drop_off_1: Yup.string().required('Drop Off (1) is required'),
    insurance: Yup.string().required('Insurance is required'),
    type_of_vehicle: Yup.string().required('Type Of Vehicle is required'),
    claim_reference: Yup.string().required('Claim Reference is required'),
    flight_number: Yup.string().required('Flight Number is required'),
    terms_accepted: Yup.bool()
        .oneOf([true], 'You need to accept the terms and conditions'),
  });

  useEffect(() => {
      
      axios.get(getAllVehicles).then(function (response) {
        if(response.data.status === 'success'){
          setVehicles(response.data.data);
        }
      });

      axios.get(getInsurances).then(function (response) {
        if(response.data.status === 'success'){
          setInsurances(response.data.data);
        }
      });
  
    }, [])

    const handleRequestSubmit = (formValues) => {
    
      const pickup_locations = [
        formValues.pick_up_1
      ];
  
      if(formValues.pick_up_2 !== ''){
        pickup_locations.push(formValues.pick_up_2)
      }
      
      if(formValues.pick_up_2 !== '' && formValues.pick_up_3 !== ''){
        pickup_locations.push(formValues.pick_up_3)
      }
  
      const dropOff_locations = [
        formValues.drop_off_1
      ];
  
      if(formValues.drop_off_2 !== ''){
        dropOff_locations.push(formValues.drop_off_2)
      }
      
      if(formValues.drop_off_2 !== '' && formValues.drop_off_3 !== ''){
        dropOff_locations.push(formValues.drop_off_3)
      }
      console.log(formValues)
      const have_special_requirements = (formValues.have_special_requirements && formValues.have_special_requirements[0]) ? formValues.have_special_requirements[0] : false; 
      console.log(have_special_requirements)
      const formdata = new FormData();
      formdata.append("date_of_transfer", formValues.date_of_transfer);
      formdata.append("pickup_time", formValues.pick_up_time);
      formdata.append("flight", formValues.flight_number);
      formdata.append("type_of_vehicle", formValues.type_of_vehicle);
      formdata.append("pickup_locations", pickup_locations);
      formdata.append("file", formValues.file_1);
      formdata.append("drop_off_locations", dropOff_locations);
      formdata.append("no_of_passengers", formValues.number_of_passengers);
      formdata.append("no_of_suitcases", formValues.number_of_suitcase);
      formdata.append("additional_details", formValues.additional_detail);
      formdata.append("terms_accepted", formValues.terms_accepted);
      formdata.append("use_new_file", uploadNew);

      formdata.append("request_id", request.request_id);
      formdata.append("booker_name", formValues.booker_name);
      formdata.append("booker_email", formValues.booker_email);
      formdata.append("passenger_name", formValues.passenger_name);
      formdata.append("passenger_contact", formValues.passenger_contact_number);
      formdata.append("passenger_age", formValues.passenger_age);
      formdata.append("claim_reference", formValues.claim_reference);
      formdata.append("insurance", formValues.insurance);

      formdata.append("have_special_requirements", have_special_requirements );
      formdata.append("requirement_options", formValues.requirement_options);
      formdata.append("type_of_transfer", formValues.type_of_transfer);
      
      formdata.append("luggage_requirement", formValues.luggage_requirement);
      formdata.append("medical_requirement", formValues.medical_requirement);

      formdata.append("other_specialist_luggage_requirement", formValues.other_specialist_luggage_requirement);
      formdata.append("other_medical_requirement", formValues.other_medical_requirement);

      formdata.append("tt_medical", formValues.tt_medical);
      formdata.append("tt_non_medical", formValues.tt_non_medical);
      formdata.append("tt_curtailment", formValues.tt_curtailment);

      formdata.append("other_tt_medical", formValues.other_medical_tot);
      formdata.append("other_tt_non_medical", formValues.other_non_medical_tot);
      formdata.append("other_tt_curtailment", formValues.other_curtailment_tot);



      // console.log(formValues.file_1)
      setLoading(true);
      axios
        .post(requestBookingPath, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        .then(({ data }) => {
          dispatch(setNotification(["success", "Request sent successfully"]))
          setLoading(false);
          navigate("/booking/" + data.data.request_id);
          
        })
        .catch(function (error) {
          if (error.response) {
            setLoading(false);
            dispatch(setNotification(["error", error.response.data.message]))

            // toast.error(error.response.data.message, {
            //   position: "bottom-center",
            // });
          }
        });
    };


  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={values => {
          handleRequestSubmit(values);
        }}
      >
        {({ setFieldValue, values, errors, touched, handleChange }) => (
          <Form>
            <div className="max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    name="booker_name"
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Booker Name
                  </label>
                  <ErrorMessage
                    name="booker_name"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                  {/* {values.booker_name} */}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="booker_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Booker Email
                  </label>
                  <ErrorMessage
                    name="booker_email"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="passenger_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Passenger Name
                  </label>
                  <ErrorMessage
                    name="passenger_name"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>

                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      name="passenger_contact_number"
                      type="tel"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                    />
                    <label
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Passenger Contact Number
                    </label>
                    <ErrorMessage
                      name="passenger_contact_number"
                      component="div"
                      className="mt-1 text-xs text-red-600 dark:text-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="number"
                    name="passenger_age"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Passenger Age
                  </label>
                  <ErrorMessage
                    name="passenger_age"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="number_of_passengers"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Number Of Passengers
                  </label>
                  <ErrorMessage
                    name="number_of_passengers"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>

              </div>


              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="claim_reference"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label

                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Claim Reference Number
                  </label>
                  <ErrorMessage
                    name="claim_reference"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>

                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      as="select"
                      name="insurance"
                      className="block w-full appearance-none bg-transparent border-b-2 border-gray-300 py-2.5 ps-0 pe-4 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600"
                    >
                      {insurances.map((insurance, ind) => (
                          <option key={ind} value={ind}>&nbsp;{insurance}</option>
                      ))}
                    </Field>
                    <label
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Insurance
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
                    <ErrorMessage
                      name="insurance"
                      component="div"
                      className="mt-1 text-xs text-red-600 dark:text-red-500"
                    />
                  </div>
                </div>
              </div>


              <div className="grid md:grid-cols-1 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  {/* <Field
                  type="checkbox"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Special Requirements
                </label> */}
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <div className="flex h-5 shrink-0 items-center">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <Field
                              id="filter-mobile-color"
                              name="have_special_requirements"
                              value="true"
                              type="checkbox"
                              className="outline-gray-400 border border-gray-300 rounded-sm accent-indigo-600"
                            />
                          </div>
                        </div>
                      </div>
                      <label
                        htmlFor="filter-mobile-color"
                        className="min-w-0 flex-1 text-gray-500 text-sm"
                      >
                        Do you have any special requirements?
                      </label>
                    </div>
                  </div>

                  {(values.have_special_requirements && values.have_special_requirements == 'true') && (
                    <div className="space-y-6 mt-3 mb-4">
                      <div className="flex items-center gap-6">
                        {/* First Checkbox */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <Field
                                  id="filter-mobile-color-0"
                                  name="requirement_options"
                                  value="luggage"
                                  type="checkbox"
                                  className="outline-gray-400 border border-gray-300 rounded-sm accent-indigo-600"
                                />
                              </div>
                            </div>
                          </div>
                          <label htmlFor="filter-mobile-color-0" className="text-gray-500 text-sm">
                            Specialist luggage
                          </label>
                        </div>

                        {/* Second Checkbox */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <Field
                                id="filter-mobile-color-1"
                                name="requirement_options"
                                value="medical"
                                type="checkbox"
                                className="outline-gray-400 border border-gray-300 rounded-sm accent-indigo-600"
                              />
                            </div>
                          </div>
                          <label htmlFor="filter-mobile-color-1" className="text-gray-500 text-sm">
                            Medical requirements
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 md:gap-6">
                    {(values && values.have_special_requirements == 'true' && values.requirement_options.includes('luggage')) &&
                      (
                        <>
                          <div className="bg-[#f1f1f5] p-[11px] px-[9px] rounded-[5px]">
                            <fieldset className="mb-3">
                              <h4 className="text-sm text-black mb-2">Specialist luggage</h4>
                              <div className=" flex items-center gap-x-6">
                                <div className="flex items-center gap-x-2">
                                  <Field
                                    id="push-everything"
                                    name="luggage_requirement"
                                    type="radio"
                                    value="skis"
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                  />
                                  <label htmlFor="push-everything" className="block text-sm  text-gray-500">
                                    Skis
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                  <Field
                                    id="push-email"
                                    name="luggage_requirement"
                                    type="radio"
                                    value="wheel_chair"
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                  />
                                  <label htmlFor="push-email" className="block text-sm  text-gray-500">
                                    Wheel chair
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                  <Field
                                    id="push-nothing"
                                    name="luggage_requirement"
                                    value="large_cases"
                                    type="radio"
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                  />
                                  <label htmlFor="push-nothing" className="block text-sm  text-gray-500">
                                    Large cases
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                  <Field
                                    id="push-other"
                                    name="luggage_requirement"
                                    type="radio"
                                    value="other"
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                  />
                                  <label htmlFor="push-other" className="block text-sm  text-gray-500">
                                    Other
                                  </label>
                                </div>
                              </div>
                            </fieldset>

                            {(values && values.requirement_options && values.luggage_requirement.includes('other')) && (
                              <>
                                <div className="col-span-full mt-3">
                                  <label htmlFor="other_specialist_luggage_requirement" className="block text-sm/6  text-gray-500">Other specialist luggage requirements</label>
                                  <div className="">
                                    <textarea
                                      name="other_specialist_luggage_requirement"
                                      id="other_specialist_luggage_requirement"
                                      rows="3"
                                      onChange={handleChange}
                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    /></div>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}

                    {(values && values.have_special_requirements == 'true' && values.requirement_options.includes('medical')) && (
                      <>
                        <div className="bg-[#f1f1f5] p-[11px] px-[9px] rounded-[5px]">
                          <fieldset className="mb-3">
                            <h4 className="text-sm text-black mb-2">Medical requirements</h4>
                            <div className=" flex items-center gap-x-6">
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="push-broken-leg"
                                  name="medical_requirement"
                                  type="radio"
                                  value="broken_leg"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="push-broken-leg" className="block text-sm  text-gray-500">
                                  Broken leg
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="push-broken-hand"
                                  name="medical_requirement"
                                  type="radio"
                                  value="broken_hand"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="push-broken-hand" className="block text-sm  text-gray-500">
                                  Broken hand
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="push-mobility"
                                  name="medical_requirement"
                                  type="radio"
                                  value="mobility_issue"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="push-mobility" className="block text-sm  text-gray-500">
                                  mobility issue
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="push-m-other"
                                  name="medical_requirement"
                                  value="other"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="push-m-other" className="block text-sm  text-gray-500">
                                  Other
                                </label>
                              </div>
                            </div>
                          </fieldset>

                          {(values && values.medical_requirement.includes("other") && (
                            <>
                              <div className="col-span-full mt-3">
                                <label htmlFor="other_medical_requirement" className="block text-sm/6  text-gray-500">Other medical requirements</label>
                                <div className="">
                                  <textarea
                                    name="other_medical_requirement"
                                    id="other_medical_requirement"
                                    rows="3"
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                  /></div>
                              </div>
                            </>
                          ))}

                        </div>
                      </>
                    )}
                  </div>



                </div>
              </div>
              <div className="grid md:grid-cols-1 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <div className="space-y-6">
                    <div className="  ">
                      <div className="flex h-5 shrink-0 items-center">
                        <div className="flex h-5 shrink-0 items-center">
                          {/* <div className="group grid size-4 grid-cols-1">
                          <input
                            id="filter-mobile-color"
                            name="color[]"
                            value="medical"
                            type="checkbox"
                             className="outline-gray-400 border border-gray-300 rounded-sm accent-indigo-600"
                          />
                        </div> */}
                        </div>
                      </div>
                      <label
                        htmlFor=""
                        className="min-w-0 flex-1 text-gray-500 text-sm">
                        Type of transfer
                      </label>
                    </div>
                  </div>
                  <div className="space-y-6 mt-3 mb-4">
                    <div className="flex items-center gap-6">
                      {/* First Checkbox */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <Field
                                id="mobile-color"
                                name="type_of_transfer"
                                value="medical"
                                type="checkbox"
                                className="outline-gray-400 border border-gray-300 rounded-sm accent-indigo-600"
                              />
                            </div>
                          </div>
                        </div>
                        <label htmlFor="mobile-color" className="text-gray-500 text-sm">
                          Medical
                        </label>
                      </div>

                      {/* Second Checkbox */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <Field
                              id="mobile-color-0"
                              name="type_of_transfer"
                              value="non medical"
                              type="checkbox"
                              className="outline-gray-400 border border-gray-300 rounded-sm accent-indigo-600"
                            />
                          </div>
                        </div>
                        <label htmlFor="mobile-color-0" className="text-gray-500 text-sm">
                          Non medical
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <Field
                              id="mobile-color-1"
                              name="type_of_transfer"
                              value="curtailment"
                              type="checkbox"
                              className="outline-gray-400 border border-gray-300 rounded-sm accent-indigo-600"
                            />
                          </div>
                        </div>
                        <label htmlFor="mobile-color-1" className="text-gray-500 text-sm">
                          Curtailment
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" grid md:grid-cols-2 md:gap-6">
                    {(values && values.type_of_transfer.includes("medical")) && (
                      <>
                        <div className="bg-[#f1f1f5] p-[11px] px-[9px] rounded-[5px]">
                          <fieldset className="mb-3">
                            <h4 className="text-sm text-black mb-2">Medical</h4>
                            <div className=" flex items-center gap-x-6">
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="medical-option-1"
                                  name="tt_medical"
                                  value="option_1"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="medical-option-1" className="block text-sm  text-gray-500">
                                  Option 1
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="medical-option-2"
                                  name="tt_medical"
                                  value="option_2"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="medical-option-2" className="block text-sm  text-gray-500">
                                  Option 2
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="medical-option-3"
                                  name="tt_medical"
                                  value="option_3"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="medical-option-3" className="block text-sm  text-gray-500">
                                  Option 3
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="medical-option-4"
                                  name="tt_medical"
                                  value="other"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="medical-option-4" className="block text-sm  text-gray-500">
                                  Other
                                </label>
                              </div>
                            </div>
                          </fieldset>
                          {values && values.tt_medical.includes("other") && (
                            <>
                              <div className="col-span-full mt-3">
                                <label htmlFor="other_medical_tot" className="block text-sm/6  text-gray-500">Other Medical requirements</label>
                                <div className="">
                                  <textarea
                                    name="other_medical_tot"
                                    id="other_medical_tot"
                                    onChange={handleChange}
                                    rows="3"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                  /></div>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                    {(values && values.type_of_transfer.includes("non medical")) && (
                      <>
                        <div className="bg-[#f1f1f5] p-[11px] px-[9px] rounded-[5px]">
                          <fieldset className="mb-3">
                            <h4 className="text-sm text-black mb-2">Non Medical</h4>
                            <div className=" flex items-center gap-x-6">
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="non-medical-option-1"
                                  name="tt_non_medical"
                                  value="option_1"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="non-medical-option-1" className="block text-sm  text-gray-500">
                                  Option 1
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="non-medical-option-2"
                                  name="tt_non_medical"
                                  value="option_2"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="non-medical-option-2" className="block text-sm  text-gray-500">
                                  Option 2
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="non-medical-option-3"
                                  name="tt_non_medical"
                                  value="option_3"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="non-medical-option-3" className="block text-sm  text-gray-500">
                                  Option 3
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="non-medical-option-other"
                                  name="tt_non_medical"
                                  value="other"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="non-medical-option-other" className="block text-sm  text-gray-500">
                                  Other
                                </label>
                              </div>
                            </div>
                          </fieldset>
                          {values && values.tt_non_medical.includes("other") && (
                            <>
                              <div className="col-span-full mt-3">
                                <label htmlFor="other_non_medical_tot" className="block text-sm/6  text-gray-500">Other Non medical requirements</label>
                                <div className="">
                                  <textarea
                                    name="other_non_medical_tot"
                                    id="other_non_medical_tot"
                                    onChange={handleChange}
                                    rows="3"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                  /></div>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                    {(values && values.type_of_transfer.includes("curtailment")) && (
                      <>
                        <div className="bg-[#f1f1f5] p-[11px] px-[9px] rounded-[5px]">
                          <fieldset className="mb-3">
                            <h4 className="text-sm text-black mb-2">Curtailment</h4>
                            <div className=" flex items-center gap-x-6">
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="curtailment-option-1"
                                  name="tt_curtailment"
                                  value="option_1"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="curtailment-option-1" className="block text-sm  text-gray-500">
                                  Option 1
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="curtailment-option-2"
                                  name="tt_curtailment"
                                  value="option_2"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="curtailment-option-2" className="block text-sm  text-gray-500">
                                  Option 2
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="curtailment-option-3"
                                  name="tt_curtailment"
                                  value="option_3"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="curtailment-option-3" className="block text-sm  text-gray-500">
                                  Option 3
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="curtailment-option-4"
                                  name="tt_curtailment"
                                  value="other"
                                  type="radio"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="curtailment-option-4" className="block text-sm  text-gray-500">
                                  Other
                                </label>
                              </div>
                            </div>
                          </fieldset>
                          {values && values.tt_curtailment.includes("other") && (
                            <>
                              <div className="col-span-full mt-3">
                                <label htmlFor="other_curtailment_tot" className="block text-sm/6  text-gray-500">Other Curtailment requirements</label>
                                <div className="">
                                  <textarea
                                    name="other_curtailment_tot"
                                    id="other_curtailment_tot"
                                    onChange={handleChange}
                                    rows="3"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                  /></div>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <hr className="mt-4 mb-8" />
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="date"
                    name="date_of_transfer"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
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
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
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
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Dialling code
                      </label>
                    </div>
                  </div>
                </div> */}
                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      name="flight_number"
                      type="tel"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                    />
                    <label
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
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
                      as="select"
                      name="type_of_vehicle"
                      className="block w-full appearance-none bg-transparent border-b-2 border-gray-300 py-2.5 ps-0 pe-4 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600"
                    >
                      {vehicles.map((vehicle, ind) => (
                          <option key={ind} value={ind}>&nbsp; {vehicle.type}</option>
                      ))}
                    </Field>
                    <label
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
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
                    <ErrorMessage
                      name="type_of_vehicle"
                      component="div"
                      className="mt-1 text-xs text-red-600 dark:text-red-500"
                    />
                  </div>
                </div>
              </div>


              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    name="pick_up_1"
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
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
                    name="drop_off_1"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Drop Off Location (1)
                  </label>
                  <ErrorMessage
                    name="drop_off_1"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
              </div>
              {(values.pick_up_1 && values.drop_off_1) && (
                <>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        name="pick_up_2"
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Pick Up Location (2)
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="text"
                        name="drop_off_2"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Drop Off Location (2)
                      </label>
                    </div>
                  </div>
                </>
              )}

              {(values.pick_up_2 && values.drop_off_2) && (
                <>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="text"
                        name="pick_up_3"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
                      />
                      <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Pick Up Location (3)
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="text"
                        name="drop_off_3"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Drop Off Location (3)
                      </label>
                    </div>
                  </div>
                </>
              )}


              <div className="grid md:grid-cols-2 md:gap-6">
                {/* <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="text"

                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Number Of Passengers
                </label>
              </div> */}
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="number_of_suitcase"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                  />

                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Number Of Suitcase
                  </label>
                  <ErrorMessage
                    name="number_of_suitcase"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 mt-1 group">
                  {(!uploadNew && request.file_name && request.file_name !== '') ? (
                    <div className="border border-gray-200 p-1 flex justify-between align-middle">
                      <div className="flex items-center">
                        Uploaded file: <a className="text-blue-600 pl-1" href={request.file} target="_blank" rel="noreferrer">{request.file_name}</a>
                      </div>
                      <div className="flex gap-2">
                        <span onClick={() => setUploadNew(!uploadNew)} className="px-3 py-2 text-xs font-medium text-center inline-flex cursor-pointer items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload New</span>
                      </div>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}

                </div>
               

              </div>

              <div className="grid md:grid-cols-1 md:gap-2">
                <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="about" className="block text-sm/6  text-gray-500">Additional detail</label>
                  <div className="mt-2">
                    <Field
                    as="textarea"
                      name="additional_detail"
                      rows="5"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    /></div>
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
                Please note any cancellation for a transfer booked in the UK less than 6 hours before the scheduled pick-up time will incur the full charges quoted. For transfers booked anywhere else in the world, any cancellation less than 48 hours before the scheduled pick-up time will incur the full charges quoted.
                </div>
                
              </label>

              {(errors.terms_accepted) && (
                <div className="mt-1 text-xs text-red-600 dark:text-red-500">
                  {errors.terms_accepted}
                </div>
              )}


            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                className="mt-2 rounded-full bg-stone-200 px-10 p-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-2 mt-2 rounded-full bg-violet-950 px-10 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {(loading) ? 'Sending..' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BookingDetailBox;
