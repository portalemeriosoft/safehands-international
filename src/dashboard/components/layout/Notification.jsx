import React, { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import database from "./../../../utils/firebase";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import NotificationsList from "./NotificationsList";

const Notification = ({ user }) => {
  
  const [alert, setAlert] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const userRef = ref(database, "notifications/" + user.data.id);
    const unsubscribe = onValue(userRef, (snapshot) => {
      setAlert(snapshot.val());
      setCounter(counter => counter + 1);
    });

    return () => unsubscribe();
  }, [user.data.id]);

  function writeUserData() {
    const userRef = ref(database, "notifications/" + user.data.id);
    set(userRef, false);
  }





  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div className="mt-1">
        <MenuButton onClick={writeUserData} className={'notification-bell' + (alert ? ' active' : '')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#d1d5db"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div>
          <NotificationsList alert={counter} />
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Notification;
