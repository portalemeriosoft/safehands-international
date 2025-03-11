import InvoiceDetailBox from "../../dashboard/components/booking/InvoiceDetailBox";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import { useLocation } from "react-router-dom";

export default function InvoiceDetail() {
    const location = useLocation();
    const { data } = location.state ;
    console.log(data)          
  const pages = [];

  return (
    <Layout title="Invoice" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Invoice"/>
         </div>
         <InvoiceDetailBox rowData ={data} />
      </>
    } />
  );
}
