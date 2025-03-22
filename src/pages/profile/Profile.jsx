
import ProfileBox from "../../dashboard/components/profile/ProfileBox";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import { userState } from "../../store/userSlice";
import { useSelector } from "react-redux";

export default function Profile() {
          
  const pages = [];
  const user = useSelector(userState);
 
  return (
    <Layout title="My Profile" content={
      <> 
         <div className="mb-4">
         <Breadcrumb pages={pages} page="Profile"/>
         </div>
         <ProfileBox type="ptofile" userData={user.data} />
      </>
    } />
  );
}
