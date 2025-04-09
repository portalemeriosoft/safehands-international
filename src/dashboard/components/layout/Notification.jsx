import React from "react";
import moment from "moment";
import { ref, set } from "firebase/database";
import database from "./../../../utils/firebase";


const Notification = () => {
  const notifications = [
    {
      id: 1,
      type: "User",
      message: "New user registered",
      user_name: "John Doe", 
      date: "2024-12-27",
    },
    {
      id: 2,
      type: "Booking",
      message: "New booking received",
      user_name: "Jane Smith",
      date: "2024-05-27",
    },
    {
      id: 3,
      type: "Request",
      message: "New service request",
      user_name: "Mike Johnson",
      date: "2024-08-21",
    },
  ];

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


      <ul className="divide-y divide-gray-100 px-3 ">
        {notifications.map((person, index) => (
           <li key={index} className="flex justify-between gap-x-6 py-2">
            <div className="flex min-w-0 gap-x-4">
              {/* <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" /> */}
              <div className="min-w-0 flex-auto">
             <p onClick={() => writeUserData(9,'Farukh', 13)}>Set User</p>
                <p className="text-sm font-semibold text-gray-900">
                  New {person.type}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  {person.user_name}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex  sm:items-end">
              <p className="mt-1 text-xs/5 text-gray-500">
                {
                  // moment().format()
                  moment(person.date).format("MMM Do ")
                }
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
