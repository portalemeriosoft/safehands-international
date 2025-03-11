import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const ErrorLabel = ({ errMsg }) => {
  return (
    <>
      <ExclamationCircleIcon className="text-red-600 inline-block h-4 w-4" aria-hidden="true" />
      <span className="text-xs text-red-600"> {errMsg}</span>
    </>
  );
};

export default ErrorLabel;
