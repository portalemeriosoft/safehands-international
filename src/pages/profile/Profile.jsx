
import ProfileBox from "../../dashboard/components/profile/ProfileBox";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";

export default function Profile() {
          
  const pages = [];

  return (
    <Layout title="My Profile" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Profile"/>
         </div>
         <ProfileBox />
      </>
    } />
  );
}
