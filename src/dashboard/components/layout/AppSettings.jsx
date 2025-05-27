import { useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../../../store/userSlice";
// import { useNavigate } from "react-router-dom";
import AppSettingModal from "./../layout/AppSettingModal";

const AppSettings = ({settings, setFetchRequestCount}) => {
  
  const user = useSelector(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [property, setProperty] = useState("");
  const [value, setValue] = useState("");
//   const navigate = useNavigate();

//   const acceptQuote = ()=>{
//     navigate("/booking-detail");
//     // request.status = 2;
//   }

  const callProperty = (title, property, value) => {
    setIsOpen(true);
    setTitle(title);
    setProperty(property);
    setValue(value);
  }


  return (
    <>

      {/* <div className="mb-3 gap-2 flex flex-wrap">
         <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">General</button>
         <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Bank Account</button>
         <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Social</button>
      </div> */}
      <div className="booking-details border-5">
      

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Company Name</div>
            <div onClick={() => {
               callProperty("Company Name", "company_name", settings.company_name);
            }} className="cursor-pointer text-blue-800">{settings.company_name ? settings.company_name : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Company Name</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Slogan</div>
            <div onClick={() => {
               callProperty("Slogan", "company_slogan", settings.company_slogan);
            }} className="cursor-pointer text-blue-800">{settings.company_slogan ? settings.company_slogan : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Slogan</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Primary Email</div>
            <div onClick={() => {
               callProperty("Email", "company_email", settings.company_email);
            }} className="cursor-pointer text-blue-800">{settings.company_email ? settings.company_email : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Primary Email</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Secondary Email</div>
            <div onClick={() => {
               callProperty("Secondary Email", "company_email2", settings.company_email2);
            }} className="cursor-pointer text-blue-800">{settings.company_email2 ? settings.company_email2 : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Secondary Email</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Phone</div>
            <div onClick={() => {
               callProperty("Phone", "company_phone", settings.company_phone);
            }} className="cursor-pointer text-blue-800">{settings.company_phone ? settings.company_phone : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Phone</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Address</div>
            <div onClick={() => {
               callProperty("Address", "company_address", settings.company_address);
            }} className="cursor-pointer text-blue-800">{settings.company_address ? settings.company_address : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Address</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Address 2</div>
            <div onClick={() => {
               callProperty("Address", "company_address2", settings.company_address2);
            }} className="cursor-pointer text-blue-800">{settings.company_address2 ? settings.company_address2 : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Address</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Location</div>
            <div onClick={() => {
               callProperty("Location", "app_location", settings.app_location);
            }} className="cursor-pointer text-blue-800">{settings.app_location ? settings.app_location : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Location</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Website</div>
            <div onClick={() => {
               callProperty("Website", "company_url", settings.company_url);
            }} className="cursor-pointer text-blue-800">{settings.company_url ? settings.company_url : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Website</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Facebook Link</div>
            <div onClick={() => {
               callProperty("Facebook Link", "facebook_link", settings.facebook_link);
            }} className="cursor-pointer text-blue-800">{settings.facebook_link ? settings.facebook_link : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Facebook Link</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Instagram Link</div>
            <div onClick={() => {
               callProperty("Instagram Link", "instagram_link", settings.instagram_link);
            }} className="cursor-pointer text-blue-800">{settings.instagram_link ? settings.instagram_link : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Instagram Link</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Linkedin Link</div>
            <div onClick={() => {
               callProperty("Linkedin Link", "linkedin_link", settings.linkedin_link);
            }} className="cursor-pointer text-blue-800">{settings.linkedin_link ? settings.linkedin_link : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Linkedin Link</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Twitter Link</div>
            <div onClick={() => {
               callProperty("Twitter Link", "twitter_link", settings.twitter_link);
            }} className="cursor-pointer text-blue-800">{settings.twitter_link ? settings.twitter_link : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Twitter Link</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Account Title</div>
            <div onClick={() => {
               callProperty("Account Title", "account_title", settings.account_title);
            }} className="cursor-pointer text-blue-800">{settings.account_title ? settings.account_title : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Account Title</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Bank</div>
            <div onClick={() => {
               callProperty("Bank", "bank", settings.bank);
            }} className="cursor-pointer text-blue-800">{settings.bank ? settings.bank : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Bank</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>IBAN</div>
            <div onClick={() => {
               callProperty("IBAN", "iban", settings.iban);
            }} className="cursor-pointer text-blue-800">{settings.iban ? settings.iban : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add IBAN</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Swift Code</div>
            <div onClick={() => {
               callProperty("Swift Code", "swift_code", settings.swift_code);
            }} className="cursor-pointer text-blue-800">{settings.swift_code ? settings.swift_code : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Swift Code</p>}</div>
          </div>
        </div>

        <div className="booking-item">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>Invoice Disclaimer</div>
            <div onClick={() => {
               callProperty("Invoice Disclaimer", "invoice_disclaimer", settings.invoice_disclaimer);
            }} className="cursor-pointer text-blue-800">{settings.invoice_disclaimer ? settings.invoice_disclaimer : <p className="text-xs py-1 rounded-full px-3 inline-block bg-blue-100 hover:bg-blue-200">Add Invoice Disclaimer</p>}</div>
          </div>
        </div>

      </div>

      <AppSettingModal
         title={title}
         property={property}
         value={value}
         setValue={setValue}
         setFetchRequestCount={setFetchRequestCount}
         isOpen={isOpen} 
         setIsOpen={setIsOpen}
      />
     
    </>
  );
};

export default AppSettings;