import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { notificationPath, removeNotificationPath } from "../../../api/path";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const NotificationsList = ({ alert }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const removeNotification = (id, type, description) => {
    axios
      .get(removeNotificationPath + "/" + id)
      .then(({ data }) => {
        console.log(data.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });

    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );

  let route;  
  switch (type) {
    case "Booking Sent":
      route = '/booking/';
      break;
    case "Booking Accepted":
      route = '/booking/';
      break;
    case "Booking Received":
      route = '/booking/';
      break;
    case "Booking Cancelled":
      route = '/booking/';
      break;
    case "Paid":
      route = '/booking/';
      break;
    case "Completed":
      route = '/booking/';
      break;
    default:
      route = '/request/';  
  }
  
    navigate(route + description);

  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(notificationPath)
      .then(({ data }) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
        setLoading(false);
      });
  }, [alert]);

  return (
    <div
      className={`${
        notifications.length === 0
          ? "text-center text-gray-500 py-3 flex justify-center"
          : ""
      }`}
    >
      {loading ? (
        <ul className="divide-y divide-gray-100 text-center w-full">
          <Audio
            visible={true}
            height="24"
            width="50"
            ariaLabel="comment-loading"
            wrapperStyle={{
              "justify-content": "center"
            }}
            wrapperClass="comment-wrapper"
            color="#5e4193"
          />
        </ul>
      ) : notifications.length === 0 ? (
        "No new notifications"
      ) : (
        <ul className="divide-y divide-gray-100 p-1 ">
          {notifications.map((notification, index) => (
            <li
              key={index}
              className="block p-2 rounded-sm cursor-pointer hover:bg-blue-50"
              onClick={() => removeNotification(notification.id, notification.title, notification.description)}
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {notification.title}
                </p>
                <div className="flex justify-between min-w-0 gap-x-4 bg-purple-50/30 rounded-sm">
                  <div className="min-w-0 flex-auto">
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {notification.customer.name}
                    </p>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:items-end">
                    <p className="mt-1 text-xs/5 text-gray-500">
                      {moment(notification.created_at).isSame(moment(), "day")
                        ? `Today at ${moment(notification.created_at).format("hh:mm A")}`
                        : moment(notification.created_at).isSame(
                            moment().subtract(1, "day"),
                            "day"
                          )
                        ? `Yesterday at ${moment(notification.created_at).format("hh:mm A")}`
                        : moment(notification.created_at).format(
                            "MMM Do hh:mm A"
                          )}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsList;
