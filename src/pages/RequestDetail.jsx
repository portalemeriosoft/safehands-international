import RequestDetailBox from "../dashboard/components/RequestDetailBox"
import Layout from "../dashboard/Layout";
import Breadcrumb from "../dashboard/components/Breadcrumb";

export default function RequestDetail() {
          
  const pages = [];

  return (
    <Layout title="Request a Quote" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Request Quote"/>
         </div>
         <RequestDetailBox />
      </>
    } />
  );
}
