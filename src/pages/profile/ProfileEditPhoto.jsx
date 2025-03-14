import ProfileBoxEditPic from "../../dashboard/components/profile/ProfileBoxEditPic";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";

export default function Profile() {
  const pages = []; 
  return (
    <Layout
      title="Edit Profile"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page={"Edit Profile (Photo)"} />
          </div>
          <ProfileBoxEditPic />
        </>
      }
    />
  );
}
