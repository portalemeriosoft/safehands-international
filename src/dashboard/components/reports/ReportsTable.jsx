import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useEffect, useState, useRef } from "react";
import { CO2ReportPath } from "../../../api/path";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReports, reportsState } from "../../../store/reportsSlice";
import Moment from "moment";
import { useNavigate } from "react-router-dom";


const ReportsTable = () => {
  const navigate = useNavigate();
  const reports = useSelector(reportsState);
  const dispatch = useDispatch();

  const gridRef = useRef();

  useEffect(() => {
    axios
      .get(CO2ReportPath)
      .then(({ data }) => {
        dispatch(setReports(data.data));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
  }, [dispatch]);

  let reportRow = null;

  console.log(reports)
  if (reports) {
    reportRow = reports.map((report) => ({
      id: report.id,
      vehicleMake: report.vehicle_make,
      vehicleModel: report.vehicle_model,
      distanceCovered: (report.distance_unit === 'km') ? report.distance_value +' Kilometers' : report.distance_value +' Miles',
      emissionInKilogram: report.co2e_kg.toLocaleString() +' Kg',
      emissionInPounds: report.co2e_lb.toLocaleString() +' Pounds',
      emissionInMetricTon: report.co2e_mt.toLocaleString() +' Metric Tons',
      createdAt: Moment(report.created_at).format("DD-MMM-YY h:mm A"),
    }
    )
    );
  }

  const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 120,
    columnLimits: [
      {
        colId: "service",
        minWidth: 290,
      },
    ],
  };

  const [colDefs] = useState([
    { field: "id", hide: true },
    { field: "vehicleMake" },
    { field: "vehicleModel" },
    { field: "distanceCovered" },
    { field: "emissionInKilogram" },
    { field: "emissionInPounds" },
    { field: "emissionInMetricTon" },
    { field: "createdAt" },
  ]);

  const onRowClicked = (event)=>{
    const clickedRowData = event.data;
    console.log(clickedRowData)
    navigate('/carbon-emission-report/'+clickedRowData.id, { state: {data: clickedRowData}} );
  }

  return (
    <div className="ag-theme-quartz" style={{ height: 'calc(100vh - 268px)' }}>
      <AgGridReact
        rowData={reportRow}
        columnDefs={colDefs}
        ref={gridRef}
        pagination={true}
        rowSelection={"single"}
        autoSizeStrategy={autoSizeStrategy}
        onRowClicked={onRowClicked}
      />
    </div>
  );
};

export default ReportsTable;
