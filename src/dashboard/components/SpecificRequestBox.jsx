// import { useState } from "react";

// import { useSelector } from "react-redux";
// import { userState } from "../../store/userSlice";
// import { Link } from "react-router-dom";
// import { CameraIcon } from "@heroicons/react/24/outline";
// import UpdatePassword from "./UpdatePassword";
// import UpdateAvailability from "./UpdateAvailability";
// import { displayPhoneNumber, displayBillingAddress } from "../../utils";
// import Requests from "../../utils/requests.json"

// const SpecificRequestBox = (rowData) => {
//   const user = useSelector(userState);
//   const {dateOfTransfer, pickUpTime, flightNumber, from, to, typeOfVehicle , numberOfPassengers , numberOfSuitcase} = rowData.rowData

//   return (
    
//     <>
//       <div className="booking-details border-5">
        
//         {(user && user.data && user.data.role !== 1) && (

//           <div className="booking-item">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>Quote Amount</div>
//               <div>AED 250</div>
//             </div>
//           </div>

//         )}

//         <div className="booking-item">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>Date Of Transfer</div>
//             <div>{dateOfTransfer}</div>
//           </div>
//         </div>

//         <div className="booking-item">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>Pick Up Time</div>
//             <div>{pickUpTime}</div>
//           </div>
//         </div>
//         <div className="booking-item">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>Flight Number</div>
//             <div>{flightNumber}</div>
//           </div>
//         </div>
//         <div className="booking-item">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>From</div>
//             <div>{from}</div>
//           </div>
//         </div>
//         <div className="booking-item">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>To</div>
//             <div>{to}</div>
//           </div>
//         </div>
//         <div className="booking-item">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>Type Of Vehicle</div>
//             <div>{typeOfVehicle}</div>
//           </div>
//         </div>
//         <div className="booking-item">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>Number Of Passengers</div>
//             <div>{numberOfPassengers}</div>
//           </div>
//         </div>
//         <div className="booking-item">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>Number Of Suitcase</div>
//             <div>{numberOfSuitcase}</div>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end pt-2">
//       {(user && user.data && user.data.role === 1) ? (
//         <Link
//           className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
//           >
//           Submit Quote
//         </Link>
//       ) : (
//         <Link
//           className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
//           >
//           Accept Quotation
//         </Link>
//       )}
//       </div>


//     </>
//   );
// };

// export default SpecificRequestBox;

import React, { useState } from 'react';

const SpecificRequestBox = () => {
  const [fuelType, setFuelType] = useState('gasoline');  // Gasoline or Diesel
  const [fuelEfficiency, setFuelEfficiency] = useState('');  // Either km/l or MPG
  const [distance, setDistance] = useState('');  // Either kilometers or miles
  const [unitSystem, setUnitSystem] = useState('metric');  // Metric or Imperial
  const [resultUnit, setResultUnit] = useState('kg'); // Result unit (kg or metricTon)
  const [co2Emissions, setCo2Emissions] = useState(null);  // CO2 Emissions in selected unit

  const handleCalculate = () => {
    let emissionFactor;
    let result;

    // Conversion factors for unit systems
    let fuelEfficiencyInMilesPerGallon;
    let distanceInMiles;

    // Convert to imperial system (MPG, miles) if the metric system is selected
    if (unitSystem === 'metric') {
      fuelEfficiencyInMilesPerGallon = fuelEfficiency * 2.3522;  // Convert km/l to MPG
      distanceInMiles = distance * 0.621371;  // Convert km to miles
    } else {
      fuelEfficiencyInMilesPerGallon = fuelEfficiency;  // Keep MPG as is
      distanceInMiles = distance;  // Keep miles as is
    }

    // Set the emission factor and calculate CO2 based on fuel type
    if (fuelType === 'gasoline') {
      emissionFactor = 2.31; // kg CO2 per liter for gasoline
      result = (distanceInMiles / fuelEfficiencyInMilesPerGallon) * emissionFactor;
    } else if (fuelType === 'diesel') {
      emissionFactor = 2.68; // kg CO2 per liter for diesel
      result = (distanceInMiles / fuelEfficiencyInMilesPerGallon) * emissionFactor;
    }

    // Convert CO2 emissions based on selected result unit
    if (resultUnit === 'metricTon') {
      result = (result / 1000).toFixed(3);  // Convert kg to metric tons
    } else {
      result = result.toFixed(2);  // Keep result in kg (rounded to 2 decimal places)
    }

    setCo2Emissions(result);  // Show result in selected unit
  };

  return (
    <div className="  flex items-center justify-center ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">Vehicle CO2 Emission Calculator</h1>

        {/* Unit System Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium text-sm mb-2">Unit System</label>
          <select
            onChange={(e) => setUnitSystem(e.target.value)}
            value={unitSystem}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="metric">Metric (km, liters)</option>
            <option value="imperial">Imperial (miles, gallons)</option>
          </select>
        </div>

        {/* Fuel Type Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Fuel Type</label>
          <select
            onChange={(e) => setFuelType(e.target.value)}
            value={fuelType}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>

        {/* Fuel Efficiency Input */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Fuel Efficiency</label>
          {unitSystem === 'metric' ? (
            <input
              type="number"
              value={fuelEfficiency}
              onChange={(e) => setFuelEfficiency(e.target.value)}
              placeholder="Enter fuel efficiency (km/l)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          ) : (
            <input
              type="number"
              value={fuelEfficiency}
              onChange={(e) => setFuelEfficiency(e.target.value)}
              placeholder="Enter fuel efficiency (MPG)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          )}
        </div>

        {/* Distance Input */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Distance Traveled</label>
          {unitSystem === 'metric' ? (
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance (km)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          ) : (
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance (miles)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          )}
        </div>

        {/* Result Unit Selection (kg or metric ton) */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Select Result Unit</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center text-gray-600">
              <input
                type="radio"
                name="resultUnit"
                value="kg"
                checked={resultUnit === 'kg'}
                onChange={() => setResultUnit('kg')}
                className="form-radio"
              />
              <span className="ml-2">kg</span>
            </label>
            <label className="inline-flex items-center text-gray-600">
              <input
                type="radio"
                name="resultUnit"
                value="metricTon"
                checked={resultUnit === 'metricTon'}
                onChange={() => setResultUnit('metricTon')}
                className="form-radio"
              />
              <span className="ml-2">Metric Ton</span>
            </label>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Calculate CO2 Emissions
        </button>

        {/* Display CO2 Emissions in selected unit */}
        {co2Emissions !== null && (
          <div className="mt-6 text-center text-lg font-semibold text-gray-700">
            <h2>CO2 Emissions: {co2Emissions} {resultUnit === 'kg' ? 'kg' : 'metric tons'}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificRequestBox;



