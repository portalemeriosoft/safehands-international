import { useState } from "react";
import models from "./../../../utils/models.json";
import { CO2ReportPath } from './../../../api/path' 
import axios from "axios";
import { useNavigate } from "react-router-dom";



const C02EmissionsCalculatorBox = () => {
  const [loading, setLoading] = useState(false);

  const [carMake, setCarMake] = useState(models[0].name);
  const [carModel, setCarModel] = useState(models[0].models[0]);
  const [carModels, setCarModels] = useState(models[0].models);
  const [distanceUnit, setDistanceUnit] = useState("KM");
  const [resultUnit, setResultUnit] = useState("pound");
  const [distanceCovered, setDistanceCovered] = useState("");
  const [distanceError, setDistanceError] = useState("");
  const navigate = useNavigate();

  const updateCarMake = (make) => {
    const [selected_make] = models.filter((x) => x.name === make);
    setCarModels(selected_make.models);
    setCarMake(make);
  };

  const handleCalculate = () => {

   
    // const headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'x-rapidapi-key': '2894634c11mshbf9a6fbe398f984p121ef4jsn60652d6a4723',
    //   'Authorization': 'Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx',
    // };

    // const data = new URLSearchParams();
    // data.append('vehicle_make', carMake);
    // data.append('vehicle_model', carModel);
    // data.append('distance_value', distanceCovered);
    // data.append('distance_unit', distanceUnit.toLowerCase());


    if (distanceCovered > 0) {
      setLoading(true);
      // axios.post(CO2ReportAPI, data, { headers })
      // .then(function (response) {
      //   console.log(response.data);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      const formData = new FormData();
      formData.append('vehicle_make', carMake);
      formData.append('vehicle_model', carModel);
      formData.append('distance_unit', distanceUnit.toLowerCase());
      formData.append('selected_unit', resultUnit);
      formData.append('distance_value', distanceCovered);
      // formData.append('co2e_gm', );
      // formData.append('co2e_kg', );
      // formData.append('co2e_lb', );
      // formData.append('co2e_mt', );
      
      axios.post(CO2ReportPath, formData)
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        if(response.data.status === 'success'){
          navigate('/carbon-emission-report/'+response.data.data.id);
        }

      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

    } else {
      setDistanceError("* Please enter a valid number or greater then zero");
    }
  };

  return (
    <div className="  flex items-center justify-center py-0">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Generate CO₂ Emission Report
        </h1>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2 text-sm">
            Select Car Make
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            value={carMake}
            onChange={(e) => updateCarMake(e.target.value)}
          >
            {models.map((make, index) => (
              <option key={index} value={make.name}>
                {make.name}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Type Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2 text-sm">
            Select Car Model
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
          >
            {carModels.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2 text-sm">
            Select Distance Unit
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center text-gray-600">
              <input
                type="radio"
                name="distanceUnit"
                value="KM"
                className="form-radio text-sm"
                checked={distanceUnit === "KM"}
                onChange={(e) => setDistanceUnit("KM")}
              />
              <span className="ml-2 text-sm">KM</span>
            </label>
            <label className="inline-flex items-center text-gray-600">
              <input
                type="radio"
                name="distanceUnit"
                value="MILE"
                className="form-radio"
                checked={distanceUnit === "MILE"}
                onChange={(e) => setDistanceUnit("MILE")}
              />
              <span className="ml-2 text-sm">MILE</span>
            </label>
          </div>
        </div>

        {/* Distance Covered Input */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2 text-sm">
            Distance Covered
          </label>
          <input
            type="number"
            placeholder={`Enter distance covered in ${distanceUnit.toLowerCase()}s`}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            value={distanceCovered}
            onChange={(e) => {
              setDistanceCovered(e.target.value);
              setDistanceError("");
            }}
          />
        {distanceError && distanceError !== "" && (
          <div className="mt-1 text-xs text-red-600 dark:text-red-500">
            {distanceError}
          </div>
        )}
        </div>


        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2 text-sm">
            Select Unit
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center text-gray-600">
              <input
                type="radio"
                name="resultUnit"
                value="pound"
                className="form-radio"
                checked={resultUnit === "pound"}
                onChange={(e) => setResultUnit("pound")}
              />
              <span className="ml-2 text-sm">Pound</span>
            </label>
            <label className="inline-flex items-center text-gray-600">
              <input
                type="radio"
                name="resultUnit"
                value="kg"
                className="form-radio text-sm"
                checked={resultUnit === "kg"}
                onChange={(e) => setResultUnit("kg")}
              />
              <span className="ml-2 text-sm">Kg</span>
            </label>
            <label className="inline-flex items-center text-gray-600">
              <input
                type="radio"
                name="resultUnit"
                value="tonne"
                className="form-radio"
                checked={resultUnit === "tonne"}
                onChange={(e) => setResultUnit("tonne")}
              />
              <span className="ml-2 text-sm">Metric Ton</span>
            </label>
          </div>
        </div>

        {/* Result Unit Selection (KM or MILE) */}

        {/* Calculate Button */}
        <button
          className="w-full py-3 bg-violet-950 text-white font-semibold rounded-md hover:bg-blue-600 transition text-sm"
          onClick={handleCalculate}
        >
          {loading ? 'Generating, Please wait..' : 'Generate CO₂ Emission Report'}
        </button>

       
      </div>
    </div>
  );
};

export default C02EmissionsCalculatorBox;
