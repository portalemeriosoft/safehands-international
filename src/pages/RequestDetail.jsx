import RequestDetailBox from "../dashboard/components/RequestDetailBox"
import Layout from "../dashboard/Layout";
import Breadcrumb from "../dashboard/components/Breadcrumb";

export default function RequestDetail() {
          
  const pages = [];

  return (
    <Layout title="Add Request" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Add Request"/>
         </div>
         <RequestDetailBox />
      </>
    } />
  );
}
