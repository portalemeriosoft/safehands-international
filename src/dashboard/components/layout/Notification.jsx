import React, { useEffect, useState } from "react";
import moment from "moment";
import { ref, set } from "firebase/database";
import database from "./../../../utils/firebase";
import axios from "axios";
import { notificationPath } from "../../../api/path";


const Notification = () => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(notificationPath)
    .then(({ data }) => { 
      setNotifications(data)
      setLoading(false);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
      setLoading(false);
    });
    
  }, [])

  console.log(notifications)

  // const notifications = [
  //   {
  //     id: 1,
  //     type: "User",
  //     message: "New user registered",
  //     user_name: "John Doe", 
  //     date: "2024-12-27",
  //   },
  //   {
  //     id: 2,
  //     type: "Booking",
  //     message: "New booking received",
  //     user_name: "Jane Smith",
  //     date: "2024-05-27",
  //   },
  //   {
  //     id: 3,
  //     type: "Request",
  //     message: "New service request",
  //     user_name: "Mike Johnson",
  //     date: "2024-08-21",
  //   },
  // ];



  function writeUserData(userId) {
   const userRef = ref(database, 'notifications/' + userId);
   
      // onValue(userRef, (snapshot) => {
      //    const data = snapshot.val();
      //    setUsers(data || {});
      // });
   
   set(userRef, 123);
 }




  return (
    <div>

      {loading ? 'Loading..' :
      notifications.length === 0 ? 'No new record' : 
      (<ul className="divide-y divide-gray-100 px-3 ">
        {notifications.map((notification, index) => (
           <li key={index} className="flex justify-between gap-x-6 py-2">
            <div className="flex min-w-0 gap-x-4">
              {/* <img alt="" src={notification.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" /> */}
              <div className="min-w-0 flex-auto">
             {/* <p onClick={() => writeUserData(9,'Farukh', 13)}>Set User</p> */}
                <p className="text-sm font-semibold text-gray-900">
                  {notification.title}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  {notification.description}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex  sm:items-end">
              <p className="mt-1 text-xs/5 text-gray-500">
                {
                  // moment().format()
                  moment(notification.date).format("MMM Do ")
                }
              </p>
            </div>
          </li>
        ))}
      </ul>)}

    </div>
  );
};

export default Notification;
