import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

const Breadcrumb = ({ pages, page }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <NavLink
            to="/"
            className="items-baseline inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </NavLink>
        </li>

        {pages.map((singlePage, i) => {
          return (
            <li key={i} aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <NavLink
                  to={singlePage.path}
                  className="items-baseline inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  {singlePage.title}
                </NavLink>
              </div>
            </li>
          );
        })}

        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="items-baseline ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
              {page}
            </span>
          </div>
        </li>
      </ol>
      <div className="flex items-center">
        <button
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLongLeftIcon
            className="inline-block h-6 w-6"
            aria-hidden="true"
          />
          <span className="pl-1">Go back</span>
        </button>
      </div>
    </nav>
  );
};

export default Breadcrumb;
