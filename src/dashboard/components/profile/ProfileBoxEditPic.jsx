import React, { useState } from "react";
import Cropper from "react-cropper";
import { useNavigate } from "react-router-dom";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import { toast } from 'react-toastify';

import { setIsAuth, setUser, userState } from "../../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { customerPhotoUploadPath } from "../../../api/path";


export const ProfileBoxEditPic = () => {
  
  const user = useSelector(userState);
  const [loading, setLoading] = useState(false);
  const defaultSrc = "";
  
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlePhotoSubmit = (imageRawData) => {
    const formData = new FormData();
    formData.append('image', imageRawData);
    setLoading(true);
    axios
      .post(customerPhotoUploadPath, formData)
      .then(({ data }) => {
        toast.success("Information updated successfully");
        setLoading(false);
        console.log(data.data.user);
        dispatch(setUser(data.data.user));
        setTimeout( () => {
          navigate("/profile");
        },2000)
      })
      .catch(function (error) {
        if (error.response) {
          setLoading(false);
          console.log(error.response.data.message);
        }
      });
  };

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);

  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <>
      {!cropData ? (
        <div className="booking-details">
          <div className="w-full">
            <input type="file" accept="image/*" onChange={onChange} />
          </div>

          {image && image !== "" && (
            <div className="pt-2">
              <Cropper
                style={{
                  height: 400,
                  width: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                onInitialized={(instance) => {
                  console.log(instance)
                  setCropper(instance);
                }}
                guides={true}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => navigate(-1)}
                  className="md:w-auto w-full mt-2 rounded-full bg-stone-200 px-10 p-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Back
                </button>
                <button
                  onClick={getCropData}
                  className="md:w-auto w-full mt-2 rounded-full bg-violet-950 px-10 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-5 max-w-sm m-auto rounded overflow-hidden shadow dark:bg-gray-800 dark:border-gray-70 divide-y divide-gray-200">
          <div className="text-center text-gray-900 font-bold text-xl mb-2">
            Save Profile Picture
          </div>
          <div className="p-4 m-auto" style={{ width: "100%" }}>
            <img
              style={{ width: "100%", borderRadius: "50%" }}
              src={cropData}
              alt="cropped"
            />
          </div>
          <div className="pt-2 flex justify-center space-x-2">
            <button
              onClick={() => setCropData("")}
              className="w-full mt-2 rounded-full bg-stone-200 px-10 p-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back
            </button>
            <button
              onClick={() => handlePhotoSubmit(cropData)}
              className="w-full mt-2 rounded-full bg-violet-950 px-10 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                    <span className="pl-2">Saving..</span>
                  </>
                ) : (
                  "Save"
                )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileBoxEditPic;
