
import TermBox from "../dashboard/components/TermBox";
import Layout from "../dashboard/Layout";
import Breadcrumb from "../dashboard/components/Breadcrumb";

export default function Terms() {
          
  const pages = [];

  return (
    <Layout title="Terms & Conditions" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Terms & Conditions"/>
         </div>
         <TermBox />
      </>
    } />
  );
}
