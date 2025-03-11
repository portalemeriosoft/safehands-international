import C02EmissionsCalculatorBox from "../../dashboard/components/booking/C02EmissionsCalculatorBox";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";

export default function CO2EmissionsCalculator() {
          
  const pages = [];

  return (
    <Layout title="CO₂ Emission Report" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="CO₂ Emission Report"/>
         </div>
         <C02EmissionsCalculatorBox />
      </>
    } />
  );
}
