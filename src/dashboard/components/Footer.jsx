import React from "react";
import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-white w-full md:fixed bottom-0 m-0 px-5 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xxl py-4 md:flex md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/driver/signup" className="hover:underline me-4 md:me-6">
               Become a driver
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline me-4 md:me-6">
              Customer Login
            </Link>
          </li>
          <li>
            <Link to="/policy" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <a
              href="/get-a-quote"
              rel="noopener noreferrer"
              target="_blank"
              className="hover:underline"
            >
              Get a Quote
              <ArrowTopRightOnSquareIcon
                className="inline h-4 w-4 pb-1 ml-0.5"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="/" className="hover:underline">
            MIV Removals
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
