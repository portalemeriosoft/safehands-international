import { useState } from "react";
import axios from "axios";
import {
  ExclamationCircleIcon,
  ArrowLongRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
  Link,
} from "react-router-dom";

import { useSelector } from "react-redux";
import { userState } from "../store/userSlice";
import { passwordUpdatePath } from "../api/path";
import Footer from "../dashboard/components/Footer";

export default function ResetPassword() {

  let { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setErorr] = useState("");
  const [msg, seteMsg] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector(userState);
  const navigate = useNavigate();
  let location = useLocation();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("password", password);
    formData.append("password_confirmation", confirmation);
    formData.append("token", token);

    axios
      .post(passwordUpdatePath, formData)
      .then(({ data }) => {
        
        setLoading(false);
        seteMsg(data.data);
        setTimeout(() => {
          navigate("/login");
        }, 3000) 
        
      })
      .catch(function (error) {
        if (error.response) {
          setLoading(false);
          setErorr(error.response.data.message);
        }
      });
  };

  return user.isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto"
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="MIV Removals"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Make your new Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErorr("");
                  }}
                  required
                  className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="text-sm">
                  <span
                    onClick={() => setShow(!show)}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  >
                    {(show ? 'Hide' : 'Show')} Password
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="confirmation"
                  name="confirmation"
                  type={show ? "text" : "password"}
                  onChange={(e) => {
                    setConfirmation(e.target.value);
                    setErorr("");
                  }}
                  required
                  className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {error && error !== "" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-bold">
                  <ExclamationCircleIcon
                    className="inline-block h-6 w-6"
                    aria-hidden="true"
                  />
                {" "+error}
                </span>
              </p>
            )}

            {msg && msg !== "" && (
              <p className="mt-2 text-sm text-green-500">
                <CheckCircleIcon
                  className="inline-block h-6 w-6 pr-1"
                  aria-hidden="true"
                />
                <span className="font-medium">{msg}</span>
              </p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-full bg-violet-950 px-3 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>{" "}
                    <span className="pl-2">Sending..</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
          <Link
            to="/login"
            className="text-sm text-end block mt-3 font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
            <ArrowLongRightIcon
                    className="inline-block h-6 w-6 pr-0"
                    aria-hidden="true"
                  />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
