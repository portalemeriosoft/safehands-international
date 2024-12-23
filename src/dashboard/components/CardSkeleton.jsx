import React from "react";

const CardSkeleton = () => {
  return (
    <div
      className="md:mx-2 my-2 max-w-md p-0 border border-gray-200 divide-gray-200 rounded-lg animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default CardSkeleton;
