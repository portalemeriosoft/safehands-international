import { useState } from "react";

import { useSelector } from "react-redux";
import { userState } from "./../../store/userSlice";
import { Link } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/24/outline";
import UpdatePassword from "./UpdatePassword";
import UpdateAvailability from "./UpdateAvailability";
import { displayPhoneNumber, displayBillingAddress } from "./../../utils";

const ProfileBox = () => {
  const user = useSelector(userState);
  const updatePasswordDisplay = useState(false);
  const updateAvailabilityDisplay = useState(false);

  return (
    <>
      <div className="booking-details border-5">
        <div className="booking-item rounded gradient-background">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {user.data.photo ? (
                <img
                  src={user.data.photo}
                  className="border-white border-2 md:w-40 md:h-40 w-full h-full rounded-full shadow"
                />
              ) : (
                <div className="border-white border-2 w-40 h-40 rounded-full shadow flex items-center justify-center">
                  <Link
                    className="text-center"
                    to={`/profile/edit/${btoa(0)}/photo`}
                  >
                    <CameraIcon
                      className="md:text-white text-gray-800 inline-block h-8 w-8"
                      aria-hidden="true"
                    />
                    <span className="block text-sm text-white">
                      Upload a photo
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <div className="flex md:justify-end md:items-end justify-start space-x-2">
              {/* <Link
                to={`/user/${btoa(0)}/location/update`}
                className="md:ml-1 rounded-full bg-stone-200 px-3 p-1 text-xs font-semibold text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Location
              </Link> */}
              <button
                onClick={() => updatePasswordDisplay[1](true)}
                type="button"
                className="md:ml-1 rounded-full bg-stone-200 px-3 p-1 text-xs font-semibold text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Password
              </button>
              {/* <button
                onClick={() => updateAvailabilityDisplay[1](true)}
                type="button"
                className="md:ml-1 rounded-full bg-stone-200 px-3 p-1 text-xs font-semibold text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Availability
              </button> */}
              {user.data.photo && (
                <Link to={`/profile/edit/${btoa(0)}/photo`}>
                  <CameraIcon
                    className="md:text-white text-black inline-block h-6 w-6"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Name</div>
            <div>{user.data.name}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Email</div>
            <div>{user.data.email}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Phone</div>
            <div>
              {user.data.phone &&
                displayPhoneNumber(user.data.dialling_code, user.data.phone)}
                +92123456789
            </div>
          </div>
        </div>

        {/* {user.data.role !== 1 && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Contact priority</div>
              <div>
                {Number(user.data.contact_priority) === 1
                  ? "Email"
                  : Number(user.data.contact_priority) === 2
                  ? "Phone"
                  : "N/A"}
              </div>
            </div>
          </div>
        )} */}

        

        {/* <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Account type</div>
            <div>
              {user.data.role && user.data.role === 1
                ? "Admin"
                : user.data.role && user.data.role === 2
                ? "Driver"
                : user.data.role && user.data.role === 3
                ? "Customer"
                : "Not Available"}
            </div>
          </div>
        </div> */}

        {/* <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Account balance</div>
            <div>
              0
            </div>
          </div>
        </div> */}

        {user.data.role === 2 && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Availability</div>
              <div>
                {(user.data.availability && user.data.availability === 1)
                  ? 'Available'
                  : 'Not Available'}
              </div>
            </div>
          </div>
        )}

        {/* {user.data.role !== 1 && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Billing address</div>
              <div>
                {user.data.billing_address
                  ? displayBillingAddress(user.data.billing_address)
                  : "NA"}
              </div>
            </div>
          </div>
        )} */}

        {/* <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Location</div>
            <div>
              {user.data.location ? (
                <Link
                  className="text-blue-500 visited:text-blue-800 hover:underline"
                  to={`/user/${btoa(0)}/location`}
                >
                  {user.data.location.title
                    ? user.data.location.title
                    : "See Location"}
                </Link>
              ) : (
                "NA"
              )}
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex justify-end pt-2">
        <Link
          className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
          to={`/profile/edit/${btoa(0)}/basic`}
        >
          Edit Profile
        </Link>
      </div>

      <UpdatePassword
        user_id={user.data.id}
        updatePasswordDisplay={updatePasswordDisplay}
      />

      <UpdateAvailability
        user_id={user.data.id}
        updateAvailabilityDisplay={updateAvailabilityDisplay}
      />
    </>
  );
};

export default ProfileBox;
