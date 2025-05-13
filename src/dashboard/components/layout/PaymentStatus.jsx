import moment from "moment";
import React from "react";

const PaymentStatus = ({ date_of_transfer, status }) => {
  
  const today = moment().startOf("day");
  const bookingDate = moment(date_of_transfer).startOf("day");

  const isPaid = status === 1;
  let payment_status, style;

  if (isPaid) {
    payment_status = "Paid";
    style = "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500";
  } else if (bookingDate.isBefore(today)) {
    payment_status = "Overdue";
    style = "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500";
  } else {
    payment_status = "Unpaid";
    style = "bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white";
  }

  return (
    <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${style}`}>
      {payment_status}
    </span>
  );
};

export default PaymentStatus;
