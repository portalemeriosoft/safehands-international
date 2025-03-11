import { useState, useRef, useEffect } from "react";

import { setIsAuth, setUser, userState } from "../../../store/userSlice";
import { Formik, Field, Form } from "formik";
import { allCountries } from "../../../utils/countries";
import * as Yup from "yup";
import ErrorLabel from "./ErrorLabel";
import axios from "axios";
import { customerUpdatePath } from "../../../api/path";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileBox = () => {
  const user = useSelector(userState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const diallingCodeElement = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [diallingCode, setDiallingCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (values) => {
    setError("");
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    formData.append("country", country);
    formData.append("dialling_code", diallingCode);

    setLoading(true);
    axios
      .post(customerUpdatePath, formData)
      .then(({ data }) => {
        toast.success("Information updated successfully");
        setLoading(false);
        console.log(data.data.user);
        dispatch(setUser(data.data.user));
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch(function (error) {
        if (error.response) {
          setLoading(false);
          setError(error.response.data.message);
        }
      });
  };

  const userSchema = Yup.object().shape({
    name: Yup.string().required("This field is Required!"),
    contact_priority: Yup.string().required("This field is Required!"),
    country_code: Yup.string().required("This field is Required!"),
    phone: Yup.string().required("This field is Required!"),
    address_line1: Yup.string().required("This field is Required!"),
    city: Yup.string().required("This field is Required!"),
    zip_code: Yup.string().required("This field is Required!"),
  });

  const updateDiallingCode = (country_code) => {
    let [selectedCountry] = allCountries.filter((x) => x[1] === country_code);
    if (diallingCodeElement && diallingCodeElement.current) {
      diallingCodeElement.current.value = "+" + selectedCountry[2];
    }
    setDiallingCode(selectedCountry[2]);
    setCountry(selectedCountry[0]);

    return selectedCountry;
  };

  let country_code = "";
  
  let address_line1 =
    (user.data.billing_address && user.data.billing_address.address) ?
    user.data.billing_address.address : '';
  let address_line2 =
    (user.data.billing_address && user.data.billing_address.home_town) ?
    user.data.billing_address.home_town : '';
  let city =
    (user.data.billing_address && user.data.billing_address.city) ? user.data.billing_address.city : '';
  let zip_code =
    (user.data.billing_address && user.data.billing_address.zip_code) ? user.data.billing_address.zip_code : '';
  let c_code =
    (user.data.billing_address && user.data.billing_address.country_code) ? user.data.billing_address.country_code : '';
  
  useEffect(() => {
    if (user.data.billing_address && user.data.billing_address.country_code) {
      updateDiallingCode(user.data.billing_address.country_code);
      country_code = user.data.billing_address.country_code;
    }
  }, []);
  
  const initialValues = {
    name: user.data.name,
    contact_priority: user.data.contact_priority,
    country_code: c_code,
    phone: user.data.phone,
    address_line1: address_line1,
    address_line2: address_line2,
    city: city,
    zip_code: zip_code,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched, handleChange }) => (
          <Form>
            <div className="max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Full name *
                  </label>
                  {errors.name && <ErrorLabel errMsg={errors.name} />}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="underline_select" className="sr-only">
                    Contact priority
                  </label>
                  <Field
                    as="select"
                    name="contact_priority"
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option value="">Contact priority</option>
                    <option value="1">Email</option>
                    <option value="2">Phone</option>
                  </Field>
                  {errors.contact_priority && (
                    <ErrorLabel errMsg={errors.contact_priority} />
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="grid md:grid-cols-1 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <label htmlFor="country_code" className="sr-only">
                        Underline select
                      </label>
                      <Field
                        as="select"
                        name="country_code"
                        onChange={(e) => {
                          handleChange(e);
                          updateDiallingCode(e.target.value);
                        }}
                        id="country_code"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
                  </div>

                  <div className="grid md:grid-cols-1 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        ref={diallingCodeElement}
                        readOnly
                        id="dialling_code"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="dialling_code"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Dialling code
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-1 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      type="tel"
                      name="phone"
                      id="phone"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                    />
                    <label
                      htmlFor="phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone number *
                    </label>
                    {errors.phone && <ErrorLabel errMsg={errors.phone} />}
                  </div>
                </div>
              </div>

              <hr className="mt-4 mb-8" />

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="address_line1"
                    id="address_line1"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="address_line1"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Address line 1 *
                  </label>
                  {errors.address_line1 && (
                    <ErrorLabel errMsg={errors.address_line1} />
                  )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="address_line2"
                    id="address_line2"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="address_line2"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Address line 2 (optional)
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="city"
                    id="city"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="city"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    City *
                  </label>
                  {errors.city && <ErrorLabel errMsg={errors.city} />}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="zip_code"
                    id="zip_code"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="zip_code"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Zip code *
                  </label>
                  {errors.zip_code && <ErrorLabel errMsg={errors.zip_code} />}
                </div>
              </div>
              {error && <ErrorLabel errMsg={error} />}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-2 rounded-full bg-stone-200 px-10 p-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Back
              </button>
              <button
                type="submit"
                className="ml-2 mt-2 rounded-full bg-violet-950 px-10 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                  "Save"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileBox;
