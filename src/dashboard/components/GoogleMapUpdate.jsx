import { useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { customerLocationUpdatePath } from "./../../api/path";
import axios from "axios";
import { setUser, userState } from "./../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const GoogleMapUpdate = ({ userId }) => {
  const user = useSelector(userState);
  const searchElement = useRef();
  const errorElement = useRef();
  const mapElement = useRef();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  let marker;
  let loc = {
    lat: "",
    lng: "",
  };

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    version: "weekly",
  });

  loader.load().then(async (google) => {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { SearchBox } = await google.maps.importLibrary("places");

    const searchBox = new SearchBox(searchElement.current);

    const latitude = +localStorage.getItem("latitude");
    const longitude = +localStorage.getItem("longitude");

    if (mapElement && mapElement.current) {
      let map = new Map(mapElement.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 14,
        mapId: process.env.REACT_APP_GOOGLE_MAP_ID,
      });

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        console.log(places);

        if (
          places &&
          places[0] &&
          places[0].geometry &&
          places[0].geometry.location
        ) {
          const bounds = new google.maps.LatLngBounds();

          if (places[0].geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(places[0].geometry.viewport);
          } else {
            bounds.extend(places[0].geometry.location);
          }
          map.fitBounds(bounds);

          if (marker) {
            marker.setMap(null);
          }

          marker = new AdvancedMarkerElement({
            map: map,
            position: places[0].geometry.location,
            draggable: true,
          });
        }
      });

      map.addListener("click", function (event) {
        if (marker) {
          marker.setMap(null);
        }

        marker = new AdvancedMarkerElement({
          map: map,
          position: event.latLng,
          draggable: true,
        });

        loc.lat = event.latLng.lat();
        loc.lng = event.latLng.lng();
      });
    }
  });

  const handleLocationSubmit = e => {
    if (loc.lat === "") {
      errorElement.current.lastElementChild.innerText = 'Please select your location.';
      errorElement.current.style.display = "block";
      return;
    }
    e.target.innerText = 'Sending..';
    errorElement.current.style.display = "none";

    const formData = new FormData();

    if (user.data.role !== 1) {
      formData.append("user_id", user.data.id);
    } else {
      formData.append("user_id", userId);
    }

    formData.append("lat", loc.lat);
    formData.append("lng", loc.lng);

    axios
      .post(customerLocationUpdatePath, formData)
      .then(({ data }) => {
        toast.success("Information updated successfully");
        e.target.innerText = 'Save';
        console.log(data.data.user);
        dispatch(setUser(data.data.user));
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch(function (error) {
        if (error.response) {
          e.target.innerText = 'Save';
          errorElement.current.style.display = "block";
          errorElement.current.lastElementChild.innerText = error.response.data.message;
        }
      });

    console.log(loc);
  };

  return (
    <>
      <div>
        <input
          ref={searchElement}
          type="text"
          className="w-full px-2 py-2 mb-2 border rounded-md text-sm"
          placeholder="Enter a location"
        />
      </div>
      <div
        className="bg-blue-100 rounded-md"
        style={{ height: "calc(100vh - 334px)" }}
      >
        <div className="w-full rounded-md h-full overflow-hidden">
          <div ref={mapElement} className="w-full h-full"></div>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div ref={errorElement} style={{ display: "none" }}>
            <ExclamationCircleIcon
              className="text-red-600 inline-block h-4 w-4"
              aria-hidden="true"
            />
            <span className="text-xs text-red-600">
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-2 rounded-full bg-stone-200 px-10 p-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back
          </button>
          <button
            type="submit"
            onClick={(e) => handleLocationSubmit(e)}
            className="ml-2 mt-2 rounded-full bg-violet-950 px-10 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default GoogleMapUpdate;
