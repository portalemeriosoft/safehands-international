import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { customersState } from "../../../store/customersSlice";
import { Link } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/24/outline";
import UpdatePassword from "../profile/UpdatePassword";
import { useParams } from "react-router-dom";
import { getUserPath } from "../../../api/path";
import axios from "axios";

const ProfileBox = () => {

  let { id } = useParams();
  const customers = useSelector(customersState);
  const updatePasswordDisplay = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!customers) {
      axios
        .get(getUserPath+'/'+id)
        .then(({ data }) => {
          setUser(data.data.user)
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.message);
          }
        });
    }else{
      const [data] = customers.filter(x => x.code === id)
      setUser(data)
    }
  }, []);

  
  if(!user){
    return <>Loading..</>;
  }

  console.log(user)

  return (
    <>
      <div className="booking-details border-5">
        <div className="booking-item rounded gradient-background">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {user.photo ? (
                <img
                  src={user.photo}
                  className="border-white border-2 w-40 h-40 rounded-full shadow"
                />
              ) : (
                <div className="border-white border-2 w-40 h-40 rounded-full shadow flex items-center justify-center">
                  <Link
                    className="text-center"
                    to={`/profile/edit/${btoa(user.id)}/photo`}
                  >
                    <CameraIcon
                      className="text-white inline-block h-8 w-8"
                      aria-hidden="true"
                    />
                    <span className="block text-sm text-white">
                      Upload a photo
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <div className="flex justify-end items-end">
              <button
                onClick={() => updatePasswordDisplay[1](true)}
                type="button"
                className="md:ml-1 rounded-full bg-stone-200 px-3 p-1 text-xs font-semibold text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Password
              </button>
              {user.photo && (
                <Link to={`/profile/edit/${btoa(user.id)}/photo`}>
                  <CameraIcon
                    className="md:ml-1 text-white inline-block h-6 w-6"
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
            <div>{user.name}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Email</div>
            <div>{user.email}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Phone</div>
            <div>
              {/* {user.role} */}
              123456789
            </div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Role</div>
            <div>
              {/* {user.role} */}
              Customer
            </div>
          </div>
        </div>
        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Status</div>
            <div>
              {/* {user.role} */}
              Active
            </div>
          </div>
        </div>

        {/* {user.role !== 1 && (
          <div className="booking-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>Contact priority</div>
              <div>{user.contact_priority}</div>
            </div>
          </div>
        )}
         */}
      </div>
      
      <div className="flex justify-end pt-2">
        <Link
          className="rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          to={`/profile/edit/${btoa(user.id)}/basic`}
        >
          Edit Profile
        </Link>
      </div>

      <UpdatePassword
        user_id={user.id}
        updatePasswordDisplay={updatePasswordDisplay}
      />
    </>
  );
};

export default ProfileBox;
