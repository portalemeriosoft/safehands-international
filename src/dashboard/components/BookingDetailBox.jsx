import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';




const BookingDetailBox = () => {

  const initialValues = {
    booker_name: '',
    booker_email: '',
    passenger_name: '',
    passenger_contact_number: '',
    passenger_age: '',
    number_of_passengers: '',
    insurance: '',
    special_requirements: [],
    specialist_luggage: [],
    s_requirements: '',
    m_requirement: '',
    type_of_transfer: [],
    tt_medical: '',
    tt_non_medical: '',
    tt_curtailment: '',
    date_of_transfer: '',
    pick_up_time: '',
    number_of_suitcase: '',
    pick_up_1: '',
    pick_up_2: '',
    pick_up_3: '',
    drop_off_1: '',
    drop_off_2: '',
    drop_off_3: '',
    type_of_vehicle: '',
    claim_reference: '',
    flight_number: '',
  }

  const SignupSchema = Yup.object().shape({
    booker_name: Yup.string().required('Booker Name is required'),
    booker_email: Yup.string().email("Invalid Email").required('Booker Email is required'),
    passenger_name: Yup.string().required('Passenger Name is required'),
    passenger_contact_number: Yup.number().required('Passenger Contact Number is required'),
    passenger_age: Yup.number().required('Passenger Age is required'),
    number_of_passengers: Yup.number().required('Number Of Passengers is required'),
    date_of_transfer: Yup.string().required('Date Of Transfer is required'),
    number_of_suitcase: Yup.number().required('Number Of Suitcase is required'),
    pick_up_time: Yup.string().required('Pick Up Time is required'),
    pick_up_1: Yup.string().required('Pick Up (1) is required'),
    drop_off_1: Yup.string().required('Drop Off (1) is required'),
    insurance: Yup.string().required('Insurance is required'),
    type_of_vehicle: Yup.string().required('Type Of Vehicle is required'),
    claim_reference: Yup.string().required('Claim Reference is required'),
    flight_number: Yup.string().required('Flight Number is required'),
  });


  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, handleChange }) => (
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
                      {/* <option value="" disabled hidden>
                        Insurance
                      </option> */}
                      <option value="10">Ten</option>
                      <option value="20">Twenty</option>
                      <option value="30">Thirty</option>
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
                              name="special_requirements"
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

                  {(values.special_requirements && values.special_requirements == 'true') && (
                    <div className="space-y-6 mt-3 mb-4">
                      <div className="flex items-center gap-6">
                        {/* First Checkbox */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <Field
                                  id="filter-mobile-color-0"
                                  name="specialist_luggage"
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
                                name="specialist_luggage"
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
                    {(values && values.special_requirements == 'true' && values.specialist_luggage.includes('luggage')) &&
                      (
                        <>
                          <div className="bg-[#f1f1f5] p-[11px] px-[9px] rounded-[5px]">
                            <fieldset className="mb-3">
                              <h4 className="text-sm text-black mb-2">Specialist luggage</h4>
                              <div className=" flex items-center gap-x-6">
                                <div className="flex items-center gap-x-2">
                                  <Field
                                    id="push-everything"
                                    name="s_requirements"
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
                                    name="s_requirements"
                                    type="radio"
                                    value="wheel chair"
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                  />
                                  <label htmlFor="push-email" className="block text-sm  text-gray-500">
                                    Wheel chair
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-2">
                                  <Field
                                    id="push-nothing"
                                    name="s_requirements"
                                    value="large cases"
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
                                    name="s_requirements"
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

                            {(values && values.specialist_luggage && values.s_requirements.includes('other')) && (
                              <>
                                <div className="col-span-full mt-3">
                                  <label htmlFor="about" className="block text-sm/6  text-gray-500">Other specialist luggage requirements</label>
                                  <div className="">
                                    <textarea
                                      name="about"
                                      id="about"
                                      rows="3"
                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    /></div>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}

                    {(values && values.special_requirements == 'true' && values.specialist_luggage.includes('medical')) && (
                      <>
                        <div className="bg-[#f1f1f5] p-[11px] px-[9px] rounded-[5px]">
                          <fieldset className="mb-3">
                            <h4 className="text-sm text-black mb-2">Medical requirements</h4>
                            <div className=" flex items-center gap-x-6">
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="push-broken-leg"
                                  name="m_requirement"
                                  type="radio"
                                  value="broken leg"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="push-broken-leg" className="block text-sm  text-gray-500">
                                  Broken leg
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="push-broken-hand"
                                  name="m_requirement"
                                  type="radio"
                                  value="broken hand"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="push-broken-hand" className="block text-sm  text-gray-500">
                                  Broken hand
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="push-mobility"
                                  name="m_requirement"
                                  type="radio"
                                  value="mobility issue"
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                                <label htmlFor="push-mobility" className="block text-sm  text-gray-500">
                                  mobility issue
                                </label>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <Field
                                  id="push-m-other"
                                  name="m_requirement"
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

                          {(values && values.m_requirement.includes("other") && (
                            <>
                              <div className="col-span-full mt-3">
                                <label htmlFor="about" className="block text-sm/6  text-gray-500">Other medical requirements</label>
                                <div className="">
                                  <textarea
                                    name="m_requirement"
                                    id="about"
                                    rows="3"
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
                                  value="Option 1"
                                  type="radio"
                                  defaultChecked
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
                                  value="Option 2"
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
                                  value="Option 3"
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
                                <label htmlFor="about" className="block text-sm/6  text-gray-500">Other Medical requirements</label>
                                <div className="">
                                  <textarea
                                    name="about"
                                    id="about"
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
                                  value="Option 1"
                                  type="radio"
                                  defaultChecked
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
                                  value="Option 2"
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
                                  value="Option 3"
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
                                <label htmlFor="about" className="block text-sm/6  text-gray-500">Other Non medical requirements</label>
                                <div className="">
                                  <textarea
                                    name="about"
                                    id="about"
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
                                  value="Option 1"
                                  type="radio"
                                  defaultChecked
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
                                  value="Option 2"
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
                                  value="Option 3"
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
                                <label htmlFor="about" className="block text-sm/6  text-gray-500">Other Curtailment requirements</label>
                                <div className="">
                                  <textarea
                                    name="about"
                                    id="about"
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
                    type="text"
                    name="pick_up_time"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
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
                      <option value="10">saloon - Sedan</option>
                      <option value="20">estate - Station Wagon</option>
                      <option value="30">8 Seater -- Large Minivan</option>
                      <option value="30">Executive Car</option>
                      <option >Executive Minivan</option>
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
                  <Field
                    type="file"
                    name="file_1"
                    className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <ErrorMessage
                    name="file_1"
                    component="div"
                    className="mt-1 text-xs text-red-600 dark:text-red-500"
                  />

                </div>
                {/* <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="file"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />

              </div> */}

              </div>

              <div className="grid md:grid-cols-1 md:gap-6 my-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="flex h-5 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="policy-1"
                          name="color[]"
                          value="medical"
                          type="checkbox"
                          className="outline-gray-400 border border-gray-300 rounded-sm accent-indigo-600"
                        />
                      </div>
                    </div>
                  </div>
                  <label
                    htmlFor="policy-1"
                    className="min-w-0 flex-1 text-gray-500 text-sm"
                  >
                    Please note any cancellation for a transfer booked in the UK less than 6 hours before the scheduled pick-up time will incur the full charges quoted. For transfers booked anywhere else in the world, any cancellation less than 48 hours before the scheduled pick-up time will incur the full charges quoted.
                  </label>
                </div>
              </div>


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
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BookingDetailBox;
