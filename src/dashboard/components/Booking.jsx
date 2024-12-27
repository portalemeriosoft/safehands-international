import BookkingDetailBox from "./SpecificBooking";
import Layout from "../Layout";
import Breadcrumb from "./Breadcrumb";
import { useLocation } from "react-router-dom";

export default function Booking() {
    const location = useLocation();
    const { data } = location.state ;
    console.log(data)          
  const pages = [];

  return (
    <Layout title="Booking"
     content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Booking"/>
         </div>
         <BookkingDetailBox rowData ={data} />
      </>
    } />
  );
}
