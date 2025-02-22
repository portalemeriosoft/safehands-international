import { useState } from "react";
import axios from "axios";
import { acceptQuoteRequestPath } from "./../../api/path";

import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { userState } from "../../store/userSlice";
import { Link } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/24/outline";
import UpdatePassword from "./UpdatePassword";
import UpdateAvailability from "./UpdateAvailability";
import { displayPhoneNumber, displayBillingAddress } from "../../utils";
import Requests from "../../utils/requests.json"

const SpecificRequestBox = (rowData) => {
  const user = useSelector(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [quote, setQuote] = useState("");

  const { dateOfTransfer, pickUpTime, flightNumber, from, to, typeOfVehicle, numberOfPassengers, numberOfSuitcase, amount, status, id } = rowData.rowData

  const handleSubmit = () => {
    const formattedAmount = Number(quote);

    if (isNaN(formattedAmount) || formattedAmount <= 0) {
      console.log("Invalid amount entered");
      return;
    }

    axios
      .post(acceptQuoteRequestPath, { amount: formattedAmount, request_id : id })
      .then(({ data }) => {
        console.log(data);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("API Error:", error.response?.data || error.message);
      });
  };


  return (
    <>
      <div className="booking-details border-5">

        {(user && user.data && user.data.role !== 1) && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Quote Amount</div>
              <div>AED {amount}</div>
            </div>
          </div>
        )}

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Status</div>
            <div>{status}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Date Of Transfer</div>
            <div>{dateOfTransfer}</div>
          </div>
        </div>


        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Pick Up Time</div>
            <div>{pickUpTime}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Flight Number</div>
            <div>{flightNumber}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>From</div>
            <div>{from}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>To</div>
            <div>{to}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Type Of Vehicle</div>
            <div>{typeOfVehicle}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Passengers</div>
            <div>{numberOfPassengers}</div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Number Of Suitcase</div>
            <div>{numberOfSuitcase}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-end pt-2">
          <button
            className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
            onClick={() => setIsOpen(true)}
          >
            Accept Quotation
          </button>
        </div>

        <Transition.Root show={isOpen}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                            Give Quote
                          </Dialog.Title>
                          <hr />
                          <div className="mt-2">
                            <div className="mt-4">
                              <label
                                htmlFor="quote_input"
                                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Add a quote
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  id="quote_input"
                                  value={quote}
                                  onChange={(e) => setQuote(e.target.value)}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex w-full justify-center rounded-full bg-violet-950 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-800 sm:ml-3 sm:w-auto"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsOpen(false)}
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
      </div>


    </>
  );
};

export default SpecificRequestBox;

// import React, { useState } from 'react';

// const SpecificRequestBox = () => {
//   const [fuelType, setFuelType] = useState('gasoline');  // Gasoline or Diesel
//   const [fuelEfficiency, setFuelEfficiency] = useState('');  // Either km/l or MPG
//   const [distance, setDistance] = useState('');  // Either kilometers or miles
//   const [unitSystem, setUnitSystem] = useState('metric');  // Metric or Imperial
//   const [resultUnit, setResultUnit] = useState('kg'); // Result unit (kg or metricTon)
//   const [co2Emissions, setCo2Emissions] = useState(null);  // CO2 Emissions in selected unit

//   const handleCalculate = () => {
//     let emissionFactor;
//     let result;

//     // Conversion factors for unit systems
//     let fuelEfficiencyInMilesPerGallon;
//     let distanceInMiles;

//     // Convert to imperial system (MPG, miles) if the metric system is selected
//     if (unitSystem === 'metric') {
//       fuelEfficiencyInMilesPerGallon = fuelEfficiency * 2.3522;  // Convert km/l to MPG
//       distanceInMiles = distance * 0.621371;  // Convert km to miles
//     } else {
//       fuelEfficiencyInMilesPerGallon = fuelEfficiency;  // Keep MPG as is
//       distanceInMiles = distance;  // Keep miles as is
//     }

//     // Set the emission factor and calculate CO2 based on fuel type
//     if (fuelType === 'gasoline') {
//       emissionFactor = 2.31; // kg CO2 per liter for gasoline
//       result = (distanceInMiles / fuelEfficiencyInMilesPerGallon) * emissionFactor;
//     } else if (fuelType === 'diesel') {
//       emissionFactor = 2.68; // kg CO2 per liter for diesel
//       result = (distanceInMiles / fuelEfficiencyInMilesPerGallon) * emissionFactor;
//     }

//     // Convert CO2 emissions based on selected result unit
//     if (resultUnit === 'metricTon') {
//       result = (result / 1000).toFixed(3);  // Convert kg to metric tons
//     } else {
//       result = result.toFixed(2);  // Keep result in kg (rounded to 2 decimal places)
//     }

//     setCo2Emissions(result);  // Show result in selected unit
//   };

//   return (
//     <div className="  flex items-center justify-center ">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">Vehicle CO2 Emission Calculator</h1>

//         {/* Unit System Selection */}
//         <div className="mb-4">
//           <label className="block text-gray-600 font-medium text-sm mb-2">Unit System</label>
//           <select
//             onChange={(e) => setUnitSystem(e.target.value)}
//             value={unitSystem}
//             className="w-full p-2 border border-gray-300 rounded-md text-sm"
//           >
//             <option value="metric">Metric (km, liters)</option>
//             <option value="imperial">Imperial (miles, gallons)</option>
//           </select>
//         </div>

//         {/* Fuel Type Selection */}
//         <div className="mb-4">
//           <label className="block text-gray-600 font-medium mb-2">Fuel Type</label>
//           <select
//             onChange={(e) => setFuelType(e.target.value)}
//             value={fuelType}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="gasoline">Gasoline</option>
//             <option value="diesel">Diesel</option>
//           </select>
//         </div>

//         {/* Fuel Efficiency Input */}
//         <div className="mb-4">
//           <label className="block text-gray-600 font-medium mb-2">Fuel Efficiency</label>
//           {unitSystem === 'metric' ? (
//             <input
//               type="number"
//               value={fuelEfficiency}
//               onChange={(e) => setFuelEfficiency(e.target.value)}
//               placeholder="Enter fuel efficiency (km/l)"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           ) : (
//             <input
//               type="number"
//               value={fuelEfficiency}
//               onChange={(e) => setFuelEfficiency(e.target.value)}
//               placeholder="Enter fuel efficiency (MPG)"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           )}
//         </div>

//         {/* Distance Input */}
//         <div className="mb-6">
//           <label className="block text-gray-600 font-medium mb-2">Distance Traveled</label>
//           {unitSystem === 'metric' ? (
//             <input
//               type="number"
//               value={distance}
//               onChange={(e) => setDistance(e.target.value)}
//               placeholder="Enter distance (km)"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           ) : (
//             <input
//               type="number"
//               value={distance}
//               onChange={(e) => setDistance(e.target.value)}
//               placeholder="Enter distance (miles)"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           )}
//         </div>

//         {/* Result Unit Selection (kg or metric ton) */}
//         <div className="mb-4">
//           <label className="block text-gray-600 font-medium mb-2">Select Result Unit</label>
//           <div className="flex space-x-4">
//             <label className="inline-flex items-center text-gray-600">
//               <input
//                 type="radio"
//                 name="resultUnit"
//                 value="kg"
//                 checked={resultUnit === 'kg'}
//                 onChange={() => setResultUnit('kg')}
//                 className="form-radio"
//               />
//               <span className="ml-2">kg</span>
//             </label>
//             <label className="inline-flex items-center text-gray-600">
//               <input
//                 type="radio"
//                 name="resultUnit"
//                 value="metricTon"
//                 checked={resultUnit === 'metricTon'}
//                 onChange={() => setResultUnit('metricTon')}
//                 className="form-radio"
//               />
//               <span className="ml-2">Metric Ton</span>
//             </label>
//           </div>
//         </div>

//         {/* Calculate Button */}
//         <button
//           onClick={handleCalculate}
//           className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
//         >
//           Calculate CO2 Emissions
//         </button>

//         {/* Display CO2 Emissions in selected unit */}
//         {co2Emissions !== null && (
//           <div className="mt-6 text-center text-lg font-semibold text-gray-700">
//             <h2>CO2 Emissions: {co2Emissions} {resultUnit === 'kg' ? 'kg' : 'metric tons'}</h2>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpecificRequestBox;



