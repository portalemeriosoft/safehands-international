
import TermBox from "../dashboard/components/layout/TermBox";
import Layout from "../dashboard/Layout";
import Breadcrumb from "../dashboard/components/layout/Breadcrumb";

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
