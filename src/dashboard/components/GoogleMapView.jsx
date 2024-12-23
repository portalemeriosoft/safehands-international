import { useRef } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
import { userState } from "./../../store/userSlice";

import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const GoogleMapView = () => {
  const user = useSelector(userState);
  const mapElement = useRef();
  let marker;

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    version: "weekly",
  });

  loader.load().then(async (google) => {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const location = {
      lat: +user.data.location.lat,
      lng: +user.data.location.lng,
    };

    if (mapElement && mapElement.current) {
      let map = new Map(mapElement.current, {
        center: location,
        zoom: 14,
        mapId: process.env.REACT_APP_GOOGLE_MAP_ID,
      });

      marker = new AdvancedMarkerElement({
        map: map,
        position: location,
        draggable: true,
      });
    }
  });

  return (
    <>
      <div>
        <Link
          className="bg-stone-200 hover:bg-stone-300 rounded-full text-xs font-medium px-5 py-1 mb-2 inline-block"
          to={`/user/${btoa(0)}/location/update`}
        >
          Update Location
        </Link>
        <a
          className="bg-stone-200 hover:bg-stone-300 ml-2 rounded-full text-xs font-medium px-5 py-1 mb-2 inline-block"
          rel="noopener noreferrer"
          target="_blank"
          href={`https://www.google.com/maps/search/?api=1&query=${user.data.location.lat}%2C${user.data.location.lng}`}
        >
          View on Google Map{" "}
          <ArrowUpRightIcon className="inline h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <div
        className="bg-blue-100 rounded-md"
        style={{ height: "calc(100vh - 271px)" }}
      >
        <div className="w-full rounded-md h-full overflow-hidden">
          <div ref={mapElement} className="w-full h-full"></div>
        </div>
      </div>
    </>
  );
};

export default GoogleMapView;
