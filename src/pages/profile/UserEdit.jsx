// import UserProfileBoxEditPic from "../../dashboard/components/profile/UserProfileBoxEdit";
import UserProfileBoxEdit from "../../dashboard/components/profile/UserProfileBoxEdit";

import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import { useParams } from "react-router-dom";

import { getUserPath } from "../../api/path";
import axios from "axios";
import SectionSpinner from "../../dashboard/components/layout/SectionSpinner";

import { useEffect, useState } from "react";

export default function UserEdit() {
  let { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const pages = [];

  useEffect(()=>{
    axios
    .get(getUserPath + "/" + id)
    .then(({ data }) => {
      if (data.status === "success") {
        setUser(data.data.user);
        setLoading(false);
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    });
  }, [])

  return (
    <Layout
      title="Edit Profile"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page="Edit Profile" />
          </div>
          {loading ? <SectionSpinner /> : <UserProfileBoxEdit user={user} />}
        </>
      }
    />
  );
}
