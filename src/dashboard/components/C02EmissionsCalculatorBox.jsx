import { useState } from "react";


const C02EmissionsCalculatorBox = () => {

    const [fuelType, setFuelType] = useState('gasoline');
    const [fuelEfficiency, setFuelEfficiency] = useState('');
    const [distance, setDistance] = useState('');
    const [unitSystem, setUnitSystem] = useState('metric');
    const [resultUnit, setResultUnit] = useState('kg');
    const [co2Emissions, setCo2Emissions] = useState(null);

    let emissionFactor;
    let result;
    let fuelEfficiencyInMilesPerGallon;
    let distanceInMiles;


    
    // console.log(resultUnit)
    // console.log(fuelType)
    // console.log(fuelEfficiency)
    // console.log(distance)
    // console.log(unitSystem)
    // console.log(co2Emissions)
    const handleCalculate = () => {
        
    }
    return (
        <div className="  flex items-center justify-center py-0">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">Generate CO₂ Emission Report</h1>

                {/* Unit System Selection */}
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2 text-sm">Unit System</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={unitSystem}
                        onChange={(e) => setUnitSystem(e.target.value)}
                    >
                        <option value="metric">Metric (km, liters)</option>
                        <option value="imperial">Imperial (miles, gallons)</option>
                    </select>
                </div>

                {/* Fuel Type Selection */}
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2 text-sm">Fuel Type</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                    >
                        <option value="gasoline">Gasoline</option>
                        <option value="diesel">Diesel</option>
                    </select>
                </div>

                {/* Fuel Efficiency Input */}
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2 text-sm">Fuel Efficiency</label>
                    {unitSystem === "metric" ? (

                        <input
                            type="number"
                            placeholder="Enter fuel efficiency (km/l)"
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                            value={fuelEfficiency}
                            onChange={(e) => setFuelEfficiency(e.target.value)}
                        />
                    )
                        : (
                            <input
                                type="number"
                                placeholder="Enter fuel efficiency (MPG)"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                value={fuelEfficiency}
                                onChange={(e) => setFuelEfficiency(e.target.value)}
                            />
                        )
                    }
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
                    <label className="block text-gray-600 font-medium mb-2 text-sm">Select Result Unit</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center text-gray-600">
                            <input type="radio" name="resultUnit"
                                value="kg"
                                className="form-radio text-sm"
                                checked={resultUnit === "Kg"}
                                onChange={(e) => setResultUnit("Kg")}
                            />
                            <span className="ml-2 text-sm">kg</span>
                        </label>
                        <label className="inline-flex items-center text-gray-600">
                            <input type="radio" name="resultUnit"
                                value="metricTon"
                                className="form-radio"
                                checked={resultUnit === "metricTon"}
                                onChange={(e) => setResultUnit("metricTon")}
                            />
                            <span className="ml-2 text-sm">Metric Ton</span>
                        </label>
                    </div>
                </div>

                {/* Calculate Button */}
                <button
                    className="w-full py-3 bg-violet-950 text-white font-semibold rounded-md hover:bg-blue-600 transition text-sm"
                    onClick={handleCalculate}
                >


                    Calculate CO₂ Emission
                </button>

                {/* Display CO2 Emissions in selected unit */}
                {co2Emissions !== null && (
                    <div className="mt-6 text-center text-lg font-semibold text-gray-700 text-sm">
                        <h2>CO₂ Emissions: {co2Emissions} {resultUnit === "Kg" ? "kg" : "metric tons"}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default C02EmissionsCalculatorBox;
