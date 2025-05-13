import React from "react";
import emission from "./../../../images/carbon-emission.svg";

const CarbonSummary = ({ report }) => { console.log(report)

  let carbonData;
  console.log(report.selected_unit)
  if(report.selected_unit === 'tonne'){
    carbonData = report.co2e_mt.toLocaleString() + ' metric ton';
  } else if (report.selected_unit === 'kg') {
    carbonData = report.co2e_kg.toLocaleString() + ' kg';
  } else if (report.selected_unit === 'pound') {
    carbonData = report.co2e_lb.toLocaleString() + ' pounds';
  }

  return (
    <div className="flex justify-center px-4 pt-4">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex justify-center h-48 bg-gray-200 rounded-sm mb-4">
          <img src={emission} alt="Carbon Emission Report" />
        </div>

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Carbon Emission Report for {report.vehicle_make} {report.vehicle_model}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Your trip of {report.distance_value.toLocaleString()} {(report.distance_unit === 'km') ? 'km' : 'miles'} in a {report.vehicle_make} {report.vehicle_model} released approximately { carbonData } of CO₂, contributing to your carbon footprint.
        </p>
        <a 
          href={process.env.REACT_APP_ORIGIN + '/report/'+ report.report_id +'/pdf'}  
          rel="noopener noreferrer"
          target="_blank" 
          className="block mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Download Report
        </a>
      </div>
    </div>
  );
};

export default CarbonSummary;
