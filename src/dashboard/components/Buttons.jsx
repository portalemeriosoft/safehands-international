import React from "react";

export const CancelBooking = ({ cancelBookingConfirmation, title }) => {
  return (
    <button
      className="justify-center rounded-full bg-violet-950 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => cancelBookingConfirmation(true)}
    >
      {title}
    </button>
  );
};

export const CancelBookingDisabled = ({title}) => {
  return (
    <button className="justify-center rounded-full bg-gray-600 px-5 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      {title}
    </button>
  );
};

const ActionButton = ({ cancelBookingConfirmation, markStatusConfirmation, user, order,  }) => {
  const task_time = new Date(order.start_task_datetime);
  const cancel_date = task_time.getTime() + 1000 * 60 * 60 * 24;
  const time_now = new Date();

  if (user.role === 1) {
    if (task_time < time_now.getTime()) {
      return (
        <CancelBooking
          cancelBookingConfirmation={markStatusConfirmation[1]}
          title="Mark Completed"
        />
      );
    } else {
      return <CancelBookingDisabled title="Mark Completed"/>;
    }
  }

  if (user.role === 3) {
   if (cancel_date > time_now.getTime()) {
     return (
       <CancelBooking
       title="Cancel Booking"
         cancelBookingConfirmation={cancelBookingConfirmation[1]}
       />
     );
   } else {
     return <CancelBookingDisabled title="Cancel Booking"/>;
   }
 }


};

export default ActionButton;
