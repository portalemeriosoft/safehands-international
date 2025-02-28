
  import UserProfileBox from "../dashboard/components/UserProfileBox";
  import ProfileBox from "../dashboard/components/ProfileBox";
  import { useLocation } from "react-router-dom";
  import Layout from "../dashboard/Layout";
  import Breadcrumb from "../dashboard/components/Breadcrumb";

  export default function Profile() {
    const location = useLocation();
    const user = location.state?.user;
    const pages = [];

    return (
      <Layout title="User Profile" content={
        <> 
          <div className="mb-4">
          <Breadcrumb pages={pages} page="User Profile"/>
          </div>
          <ProfileBox userData ={user} />
          {/* <UserProfileBox /> */}
        </>
      } />
    );
  }
