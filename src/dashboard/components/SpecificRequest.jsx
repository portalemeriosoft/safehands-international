
import  SpecificRequestBox from "./SpecificRequestBox" 
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from "react-router-dom";

export default function SpecificRequest() {
    const location = useLocation();
    const { data } = location.state ;
  const pages = [];

  return (
    <Layout title="Request" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Request"/>
         </div>
         <SpecificRequestBox rowData ={data} />
      </>
    } />
  );
}
