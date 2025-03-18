import ProfileBoxEditPic from "../../dashboard/components/profile/ProfileBoxEditPic";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import { userState } from "../../store/userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


export default function Profile({ type }) {
  
  const pages = []; 
  const user = useSelector(userState);
  const params = useParams();
  let imageId;

  if (type === 'profile') {
    imageId = user.data.hash;
  } else {
    imageId = params.id;
  }

  return (
    <Layout
      title="Edit Profile"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page={"Edit Profile (Photo)"} />
          </div>
          <ProfileBoxEditPic type={type} userProfile={imageId}/>
        </>
      }
    />
  );
}
