import UserProfileBox from "../../dashboard/components/profile/UserProfileBox";
import ProfileBox from "../../dashboard/components/profile/ProfileBox";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCustomers, customersState } from "../../store/customersSlice";
import NotFound from "../../dashboard/components/layout/NotFound";

import { customersPath, getAllUsers } from "../../api/path";
import axios from "axios";
import PageSpinner from "../../dashboard/components/layout/PageSpinner";

export default function Profile() {

  const users = useSelector(customersState);
  let { id } = useParams();
  const dispatch = useDispatch();

  if (!users) {
    axios
      .get(getAllUsers)
      .then(({ data }) => {
        dispatch(setCustomers(data.data.users));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });

    return  <PageSpinner />;
  } else {
    const [user] = users.filter((x) => x.hash === id);
    
    const pages = [];
  
    return (
      <Layout
        title="User Profile"
        content={
          <>
            <div className="mb-4">
              <Breadcrumb pages={pages} page="User Profile" />
            </div>
            {(!user) ? 
              <NotFound title="404!" msg="Sorry, User not found" btn_text="Back to Users" btn_path="/users" /> :
              <ProfileBox userData={user} />
            }
            {/* <ProfileBox userData={user} /> */}
            {/* <UserProfileBox /> */}
          </>
        }
      />
    );

  }

  // const user = useSelector(userState);
}
