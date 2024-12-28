import BookingDetailBox from "../dashboard/components/BookingDetailBox";
import Layout from "../dashboard/Layout";
import Breadcrumb from "../dashboard/components/Breadcrumb";

export default function BookingDetail() {
          
  const pages = [];

  return (
    <Layout title="Booking Request" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Booking Request"/>
         </div>
         <BookingDetailBox/>
      </>
    } />
  );
}
