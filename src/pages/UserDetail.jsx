
import UserProfileBox from "../dashboard/components/UserProfileBox";
import Layout from "../dashboard/Layout";
import Breadcrumb from "../dashboard/components/Breadcrumb";

export default function Profile() {
          
  const pages = [];

  return (
    <Layout title="User Profile" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="User Profile"/>
         </div>
         <UserProfileBox />
      </>
    } />
  );
}