import BookkingDetailBox from "./BookkingDetailBox";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from "react-router-dom";

export default function BookingDetail() {
    const location = useLocation();
    const { data } = location.state ;
    console.log(data)          
  const pages = [];

  return (
    <Layout title="Booking" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Booking"/>
         </div>
         <BookkingDetailBox rowData ={data} />
      </>
    } />
  );
}