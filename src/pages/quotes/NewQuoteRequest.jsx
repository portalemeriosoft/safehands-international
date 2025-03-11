import QuoteRequestForm from "../../dashboard/components/booking/QuoteRequestForm"
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";

export default function NewQuoteRequest() {
          
  const pages = [];

  return (
    <Layout title="Request a Quote" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Request Quote"/>
         </div>
         <QuoteRequestForm />
      </>
    } />
  );
}
