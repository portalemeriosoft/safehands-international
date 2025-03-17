import { NavLink } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const NotFound = ({
   title,
   msg,
   btn_text,
   btn_path
}) => {
  return (
    <div
      id="error-page"
      className="flex justify-center h-full p-24 items-center bg-gray-100"
    >
      <div className="text-center">
        <h1 className="font-medium text-6xl pb-3">{title}</h1>
        <p className="pb-5">{msg}</p>
        <NavLink
          to={btn_path}
          className="flex w-full justify-center rounded-full bg-violet-950 px-3 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ArrowLeftIcon className="block h-6 w-6 mr-2" aria-hidden="true" />
          {btn_text}
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
