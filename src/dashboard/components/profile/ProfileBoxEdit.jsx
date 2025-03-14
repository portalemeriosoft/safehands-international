import { useState, useRef, useEffect } from "react";

import { setIsAuth, setUser, userState } from "../../../store/userSlice";
import { Formik, Field, Form } from "formik";
import { allCountries } from "../../../utils/countries";
import * as Yup from "yup";
import ErrorLabel from "./../layout/ErrorLabel";
import axios from "axios";
import { profileUpdatePath } from "../../../api/path";
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
      .post(profileUpdatePath, formData)
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
    country_code: Yup.string().required("This field is Required!"),
    phone: Yup.string().required("This field is Required!"),
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

  useEffect(() => {
    if (user.data && user.data.country) { 
      updateDiallingCode(user.data.country);
    }
  }, []);


  const initialValues = {
    name: user.data.name,
    country_code: user.data.country,
    phone: user.data.phone,
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
            <div className="md:space-y-6">
              <div className="max-w-sm mx-auto">
                <div className="full-name w-full md:mt-0 mt-3 mb-5">
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
                    <div>
                    <option value="">Choose a country</option>
                    {allCountries.map((country, ind) => (
                      <option key={ind} value={country[1]}>
                        {country[0]}
                      </option>
                    ))}

                    </div>
                  </Field>
                  {errors.country_code && (
                    <ErrorLabel errMsg={errors.country_code} />
                  )}
                </div>

                <div className="full-name w-full md:mt-0 mt-3 mb-5">
                  <label
                    htmlFor="dialling_code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Dialling code
                  </label>
                  <input
                    id="dialling_code"
                    readOnly
                    ref={diallingCodeElement}
                    type="text"
                    className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="full-name w-full md:mt-0 mt-3 mb-5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    type="tel"
                    onChange={(e) => {
                      handleChange(e);
                      setError("");
                    }}
                    autoComplete="phone"
                    className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                  />
                  {errors.phone && touched.phone && (
                    <ErrorLabel errMsg={errors.phone} />
                  )}
                </div>

                {error && <ErrorLabel errMsg={error} />}

                <div className="w-full md:mt-0 mt-3 mb-5">
                <button
                    type="submit"
                    className="block w-full mt-2 p-2.5 rounded-full bg-violet-950 px-10 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="block w-full mt-2 rounded-full bg-stone-200 px-10 p-2.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                  
                </div>

              </div>

            </div>

          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileBox;
