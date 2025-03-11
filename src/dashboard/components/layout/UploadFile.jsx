
const UploadFile = ({
  data,
  setFieldValue,
  errors
}) => {
  return (
    <div>
      <input
        type="file"
        name="file_1"
        // set supported file types here,
        // could also check again within formik validation or backend
        accept=".pdf, .jpeg, .jpg, .png, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .zip, .txt"
        onChange={(e) => {
          // Object is possibly null error w/o check
          if (e.currentTarget.files) {
            setFieldValue("file_1", e.currentTarget.files[0]);
          }
        }}
      />
   
    </div>
  );
};

export default UploadFile;
