
import Signup from "../pages/Signup";
import Layout from "../dashboard/Layout";
import Breadcrumb from "../dashboard/components/Breadcrumb";


export default function UserRegister() {
          
  const pages = [];

  return (
    <Layout title="User Registration" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="User Registration"/>
         </div>
         <Signup />
      </>
    } />
  );
}
