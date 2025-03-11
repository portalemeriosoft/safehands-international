import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useDispatch } from "react-redux";
import { removeIsAuth, removeUser } from "../../store/userSlice.js";

import { logoutPath } from "../../api/path.js";
import PageSpinner from "../../dashboard/components/layout/PageSpinner.jsx";

const Logout = () => {
  const [error, seteErorr] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");

      axios
        .post(logoutPath)
        .then(({ data }) => {
          if (data.status === "success") {
            localStorage.removeItem("token");
            dispatch(removeUser());
            dispatch(removeIsAuth());
            setLoading(false);
            navigate("/");
          }
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 401) {
              localStorage.removeItem("token");
            }
            setLoading(false);
            seteErorr(error.response.data.message);
            console.log(error);
          }
        });
    } else {
      setLoading(false);
    }
  }, [navigate]);

  return loading ? <PageSpinner /> : <>{error}</>;
};

export default Logout;
