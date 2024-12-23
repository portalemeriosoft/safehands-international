import GoogleMapUpdate from "../dashboard/components/GoogleMapUpdate";
import Layout from "../dashboard/Layout";
import Breadcrumb from "../dashboard/components/Breadcrumb";
import { useParams } from "react-router-dom";

export default function LocationMapUpdate() {
  const pages = [
    {
      title: "Profile",
      path: "/profile",
    },
  ];

  let { id } = useParams();
  id = atob(id);

  return (
    <Layout
      title="Location"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page="Location" />
          </div>
          <GoogleMapUpdate userId={id} />
        </>
      }
    />
  );
}
