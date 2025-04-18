import ProfileBoxEditPic from "../../dashboard/components/profile/ProfileBoxEditPic";
import ProfileBoxEdit from "../../dashboard/components/profile/ProfileBoxEdit";
import Signup from "../../pages/auth/Signup";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import { useParams } from "react-router-dom";

export default function Profile() {
  const pages = [];

  return (
    <Layout
      title="Edit Profile"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page="Edit Profile" />
          </div>
          {/* <Signup /> */}
          <ProfileBoxEdit />
        </>
      }
    />
  );
}
