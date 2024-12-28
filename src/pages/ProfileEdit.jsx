import ProfileBoxEditPic from "../dashboard/components/ProfileBoxEditPic";
// import ProfileBoxEdit from "../dashboard/components/ProfileBoxEdit";
import Signup from "../pages/Signup";
import Layout from "../dashboard/Layout";
import Breadcrumb from "../dashboard/components/Breadcrumb";
import { useParams } from "react-router-dom";

export default function Profile() {
  const pages = [];

  let { id, type } = useParams();
  id = atob(id);

  const title = type === "photo" ? "(Photo)" : "(Basic Info)";

  return (
    <Layout
      title="Edit Profile"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page={"Edit Profile " + title} />
          </div>

          {type === "photo" ? <ProfileBoxEditPic /> : <Signup />}
          {/* {type === "photo" ? <ProfileBoxEditPic /> : <ProfileBoxEdit />} */}
        </>
      }
    />
  );
}
