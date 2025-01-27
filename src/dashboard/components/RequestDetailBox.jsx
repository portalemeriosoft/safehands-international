import { Formik, Field, Form } from "formik";
import { allCountries } from "../../utils/countries";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const RequestDetailBox = () => {
  let initialValues = {
    pick_up_1 : '',
    pick_up_2 : '',
    pick_up_3 : '',
    drop_off_1 : '',
    drop_off_2 : '',
    drop_off_3 : '',
    file_1 : '',
    number_of_suitcase : '',
    number_of_passengers : '',
    date_of_transfer : '',
    pick_up_time : '',
    flight_number : '',
  }
  return (
    <>
      <Formik 
      initialValues={initialValues}
      >
        {({values, error, touched, handlechange}) =>(
          <Form>
          <div className="max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="text"
                  name="date_of_transfer"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Date Of Transfer
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="text"

                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  name="pick_up_time"
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Pick Up Time
                </label>
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
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Flight Number
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-1 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">


                  <Field
                    as="select"
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
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Pick Up (1)
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  name="drop_off_1"
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Drop Off (1)
                </label>
              </div>
            </div>
            {(values.pick_up_1 && values.drop_off_1) && (
              <>
              <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  name="pick_up_2"
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Pick Up (2)
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  name="drop_off_2"
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Drop Off (2)
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
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  name="pick_up_3"
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Pick Up (3)
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  name="drop_off_3"
                />
                <label
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Drop Off (3)
                </label>
              </div>
            </div>
              </>
            )}
           
            <div className="grid md:grid-cols-2 md:gap-6">
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
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  name="number_of_suitcase"
                />
                <label

                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Number Of Suitcase
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 mt-1 group">
                <Field
                  type="file"
                  name="file_1"
                  className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />

              </div>
            </div>
            <div className="grid md:grid-cols-1 md:gap-2">
              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="about" className="block text-sm/6  text-gray-500">Message</label>
                <div className="mt-2">
                  <textarea
                    name="about"
                    id="about"
                    rows="5"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  /></div>
              </div>
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
              Back
            </button>
            <button
              type="text"
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

export default RequestDetailBox;
