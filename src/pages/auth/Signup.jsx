import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLongRightIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import * as Yup from "yup";
import ErrorLabel from "../../dashboard/components/layout/ErrorLabel";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuth, setUser, userState } from "../../store/userSlice";
import { registerPath } from "../../api/path";
import Footer from "../../dashboard/components/layout/Footer";
import { Formik, Field, Form } from "formik";
import { allCountries } from "../../utils/countries";
import { getCountry, getDiallingCode } from "../../utils";

export default function Admin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  // const [countries, setCountries] = useState([]);

  // const user = useSelector(userState);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // let location = useLocation();

  const [diallingCode, setDiallingCode] = useState('');

  const updateDiallingCode = (country_code) => { 
    
    if(country_code && country_code !== ''){
      let [selectedCountry] = allCountries.filter((x) => x[1] === country_code);
      setDiallingCode(selectedCountry[2]);
      return selectedCountry;
    }

    setDiallingCode('');
    return '';

  };


  const initialValues = {
    name: "",
    email: "",
    country_code: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role: "",
  };
    
  const userSchema = Yup.object().shape({
    name: Yup.string().required("Full name is Required!"),
    email: Yup.string().email().required("Email is Required!"),
    country_code: Yup.string().required("Country code is Required!"),
    phone: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits.")
    .min(6, "Phone number must be at least 6 digits.")
    .max(11, "Phone number must be at most 11 digits.")
    .required("Phone number is required!"),
    role: Yup.string().required("Select any one role!"),
    password: Yup.string().min(8).required("Password field is Required!"),
    password_confirmation: Yup.string()
      .min(8)
      .test(
        "password-should-match",
        "Confirm password must match",
        function (value) {
          return this.parent.password === value;
        }
      )
      .required("Password Confirmation is Required!"),
  });

  const handleLoginSubmit = (values) => {
    setError("");
    setLoading(true);

    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    formData.append('country', getCountry(values.country_code));
    formData.append('dialling_code', getDiallingCode(values.country_code));
    
    axios
      .post(registerPath, formData)
      .then(({ data }) => {
        // localStorage.setItem("token", data.data.token);

        // axios.defaults.headers.common["Authorization"] =
          // "Bearer " + data.data.token;

        // dispatch(setUser(data.data.user));
        // dispatch(setIsAuth());
        setLoading(false);
        navigate("/");
      })
      .catch(function (error) {
        if (error.response) {
          setLoading(false);
          setError(error.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-start px-6 py-6 lg:px-8">

        <div className="mt-10 sm:mx-auto md:w-6/12 md:max-w-6/12">
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values) => handleLoginSubmit(values)}
          >
            {({ errors, touched, handleChange }) => (
              <Form className="md:space-y-6">
                <div className="md:flex md:space-x-4">
                  <div className="full-name w-full md:mt-0 mt-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      onChange={(e) => {
                        handleChange(e);
                        setError("");
                      }}
                      autoComplete="name"
                      className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                    />
                    {errors.name && touched.name && (
                      <ErrorLabel errMsg={errors.name} />
                    )}
                  </div>

                  <div className="email-address w-full md:mt-0 mt-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      onChange={(e) => {
                        handleChange(e);
                        setError("");
                      }}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                    />
                    {errors.email && touched.email && (
                      <ErrorLabel errMsg={errors.email} />
                    )}
                  </div>
                </div>


                <div className="md:flex md:space-x-4">


                <div className="full-name w-full md:mt-0 mt-3 mb-5">
                  <label
                    htmlFor="country_code"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select your country
                  </label>
                  <Field 
                    as="select" size="1"
                    name="country_code"
                    onChange={(e) => {
                      handleChange(e);
                      updateDiallingCode(e.target.value);
                    }}
                    id="country_code"
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose a country</option>
                    {allCountries.map((country, ind) => (
                      <option key={ind} value={country[1]}>
                        {country[0]}
                      </option>
                    ))}
                  </Field>
                  {errors.country_code && (
                    <ErrorLabel errMsg={errors.country_code} />
                  )}
                </div>

                  {/* <div className="country w-full md:mt-0 mt-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <Field
                      id="country"
                      name="country"
                      type="text"
                      onChange={(e) => {
                        handleChange(e);
                        setError("");
                      }}
                      autoComplete="country"
                      className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                    />
                    {errors.name && touched.name && (
                      <ErrorLabel errMsg={errors.name} />
                    )}
                  </div> */}

                  <div className="phone w-full md:mt-0 mt-3">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone number
                    </label>
                    <div className="relative">
                      
                      <span className="absolute top-0 bottom-0 left-[10px] my-auto sm:text-sm sm:leading-6 h-full flex items-center border-r border-[#cecede] pr-2.5">{ (diallingCode) && '+'+diallingCode }</span>
                      <Field
                        id="phone"
                        name="phone"
                        type="phone"
                        onChange={(e) => {
                          handleChange(e);
                          setError("");
                        }}
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 pr-2.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                        style={{
                          paddingLeft: `${diallingCode.length+4}ch`, // Dynamic padding
                        }}
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <ErrorLabel errMsg={errors.phone} />
                    )}
                  </div>
                </div>

                <div className="md:flex md:space-x-4">
                  <div className="pass w-full md:mt-0 mt-3">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div>
                      <div className="relative">
                        <div
                          onClick={() =>
                            setPasswordVisibility(!passwordVisibility)
                          }
                          className="absolute inset-y-0 end-2 flex items-center ps-3.5 cursor-pointer"
                        >
                          {!passwordVisibility ? (
                            <EyeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <EyeSlashIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                        <Field
                          id="password"
                          name="password"
                          type={passwordVisibility ? "text" : "password"}
                          onChange={(e) => {
                            handleChange(e);
                            setError("");
                          }}
                          autoComplete="current-password"
                          className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    {errors.password && touched.password && (
                      <ErrorLabel errMsg={errors.password} />
                    )}
                  </div>

                  <div className="pass-confirm w-full md:mt-0 mt-3">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm password
                      </label>
                    </div>
                    <div>
                      <div className="relative">
                        <div
                          onClick={() =>
                            setConfirmPasswordVisibility(
                              !confirmPasswordVisibility
                            )
                          }
                          className="absolute inset-y-0 end-2 flex items-center ps-3.5 cursor-pointer"
                        >
                          {!confirmPasswordVisibility ? (
                            <EyeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <EyeSlashIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                        <Field
                          id="password_confirmation"
                          name="password_confirmation"
                          type={confirmPasswordVisibility ? "text" : "password"}
                          onChange={(e) => {
                            handleChange(e);
                            setError("");
                          }}
                          className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    {errors.password_confirmation &&
                      touched.password_confirmation && (
                        <ErrorLabel errMsg={errors.password_confirmation} />
                      )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="w-full md:mt-0 mt-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Select role
                      </label>
                    </div>
                    <Field
                      type="radio"
                      id="role_admin"
                      name="role"
                      value="1"
                      className="hidden peer"
                      onChange={(e) => {
                        handleChange(e);
                        setError("");
                      }}
                    />
                    <label
                      htmlFor="role_admin"
                      className="inline-flex items-center justify-between w-full p-2.5 text-gray-500 bg-white ring-1 ring-inset ring-gray-300 rounded-md cursor-pointer dark:hover:text-gray-300 dark:ring-gray-700 dark:peer-checked:text-blue-500 peer-checked:ring-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 "
                    >
                      <div className="block sm:text-sm sm:leading-6">
                        <div>Admin</div>
                      </div>
                      <svg
                        className="w-4 h-4 ms-3 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </label>
                    {errors.role &&
                      touched.role && (
                        <ErrorLabel errMsg={errors.role} />
                      )}
                  </div>
                  <div className="w-full md:mt-0 mt-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium leading-6 text-gray-900 opacity-0">
                        1
                      </label>
                    </div>
                    <Field
                      type="radio"
                      id="role_customer"
                      name="role"
                      value="2"
                      className="hidden peer"
                      onChange={(e) => {
                        handleChange(e);
                        setError("");
                      }}
                    />
                    <label
                      htmlFor="role_customer"
                      className="inline-flex items-center justify-between w-full p-2.5 text-gray-500 bg-white ring-1 ring-inset ring-gray-300 rounded-md cursor-pointer dark:hover:text-gray-300 dark:ring-gray-700 dark:peer-checked:text-blue-500 peer-checked:ring-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block sm:text-sm sm:leading-6">
                        <div>Customer</div>
                      </div>
                      <svg
                        className="w-4 h-4 ms-3 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </label>
                  </div>
                </div>

                <div>
                  {(error && error !== '') && (
                    <ErrorLabel errMsg={error} />
                  )}
                </div>

                <div className="flex justify-end submit-btn md:mt-0 mt-3">
                  <button
                    type="submit"
                    className="md:w-auto w-full rounded-full bg-violet-950 px-12 p-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
              </Form>
            )}
          </Formik>

          {/* <div className="flex justify-end">
            <Link
              to="/login"
              className="text-sm inline-block mt-3 font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Already have an account, login here
              <ArrowLongRightIcon
                className="inline-block h-6 w-6 pr-0"
                aria-hidden="true"
              />
            </Link>
          </div> */}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
