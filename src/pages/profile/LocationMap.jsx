import GoogleMapView from "../dashboard/components/GoogleMapView";
import Layout from "../../dashboard/Layout";
import Breadcrumb from "../../dashboard/components/layout/Breadcrumb";
import { useParams } from "react-router-dom";

export default function LocationMap() {
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
          <GoogleMapView />
        </>
      }
    />
  );
}
