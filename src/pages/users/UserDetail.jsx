
  import UserProfileBox from "../../dashboard/components/profile/UserProfileBox";
  import ProfileBox from "../../dashboard/components/profile/ProfileBox";
  import { useLocation } from "react-router-dom";
  import Layout from "../../dashboard/Layout";
  import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";

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
