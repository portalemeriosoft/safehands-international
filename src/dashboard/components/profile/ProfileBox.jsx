import { useState } from "react";

import { Link } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/24/outline";
import UpdatePassword from "../profile/UpdatePassword";
import UpdateAvailability from "../profile/UpdateAvailability";
import { getCountry, displayPhoneNumber } from "../../../utils";

import { userState } from "../../../store/userSlice";
import { useSelector } from "react-redux";

const ProfileBox = ({ userData }) => {

  
  const updatePasswordDisplay = useState(false);
  const updateAvailabilityDisplay = useState(false);

  const user = useSelector(userState);
  
  return (
    <>
      <div className="booking-details border-5">
        <div className="booking-item rounded gradient-background">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {userData.photo ? (
                <img
                  alt="profile"
                  src={userData.photo}
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
           
              <button
                onClick={() => updatePasswordDisplay[1](true)}
                type="button"
                className="md:ml-1 rounded-full bg-stone-200 px-3 p-1 text-xs font-semibold text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Password
              </button>
            
              {userData.photo && (
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
            <div>{userData.name}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Email</div>
            <div>{userData.email}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Phone</div>
            <div>
              {userData.phone &&
                displayPhoneNumber(userData.dialling_code, userData.phone)}
            </div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Country</div>
            <div>
              {getCountry(userData.country)}
            </div>
          </div>
        </div>

        {(userData && userData.role === 1) && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Role</div>
              <div>
                {(userData.role && userData.role === 1) ? 'Admin' : 'Customer'}
              </div>
            </div>
          </div>
        )}

  

      </div>

      <div className="flex justify-end pt-2">
        
        {(userData.id !== user.data.id) ? (
          <Link
            className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
            to={'/user/edit/'+userData.hash}
          >
            Edit User Profile
          </Link>

        ): (

          <Link
            className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
            to={`/profile/edit`}
          >
            Edit Profile
          </Link>
        )}
        {/* <Link
          className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-auto text-center"
          to={`/profile/edit/${btoa(0)}/basic`}
        >
          Edit Profile
        </Link> */}
      </div>

      <UpdatePassword
        user_id={userData.id}
        updatePasswordDisplay={updatePasswordDisplay}
      />

      <UpdateAvailability
        user_id={userData.id}
        updateAvailabilityDisplay={updateAvailabilityDisplay}
      />
    </>
  );
};

export default ProfileBox;
