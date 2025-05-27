import { useEffect, useState } from "react";
import Layout from "./../dashboard/Layout";
import Breadcrumb from "./../dashboard/components/layout/Breadcrumb";
import axios from "axios";
import { generalSettingsPath } from "../api/path.js";
import AppSettings from "../dashboard/components/layout/AppSettings.jsx";
import TableSkeleton from "../dashboard/components/layout/TableSkeleton.jsx";

export default function UserRegister() {
  const pages = [];
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchRequestCount, setFetchRequestCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(generalSettingsPath)
      .then((response) => {
        setSettings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching app settings:", error);
        setLoading(false);
        // toast.error("Failed to load app settings.");
      });
  }, [fetchRequestCount]);

  return (
    <Layout
      title="General Settings"
      content={
        <>
          <div className="mb-4">
            <Breadcrumb pages={pages} page="General Settings" />
          </div>
          {settings && Object.keys(settings).length > 0 ? (
            <AppSettings
              settings={settings}
              setFetchRequestCount={setFetchRequestCount}
            />
          ) : (
            <TableSkeleton />
          )}
        </>
      }
    />
  );
}
