import React, { useState } from "react";
import logo1 from "../Images/reglogo.mp4";
import { CgProfile } from "react-icons/cg";
import { BsTelephone } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import regpic from "../Images/regpic.webp";
import svg1 from "../Images/scholarship.svg";
import svg2 from "../Images/education.svg";
import svg3 from "../Images/shortlist.svg";
import svg4 from "../Images/admission.svg";
import svg5 from "../Images/codind.svg";
import svg6 from "../Images/book.svg";
import Axios from "axios";

function sendData() {
  const mobile = document.getElementById("mobileNumber").value;
  const location = document.getElementById("location").value;
  const name = document.getElementById("name").value;

  console.log("data: ", name, location, mobile);

  Axios.post("http://localhost:5000/register", {
    mobile: mobile,
    name: name,
    location: location,
  })
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

const RegistrationModal = ({ closeModal }) => {
  const [records, setRecords] = useState([]);
  const [user, setUser] = useState({
    name: "",
    mobileNumber: "",
    location: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = { ...user, id: new Date().getTime().toString() };
    console.log(records);
    setRecords([...records, newRecord]);
    setUser({ name: "", mobileNumber: "", location: "" });
  };

  return (
    <>
      <section className="w-full h-full fixed top-0 left-0  flex items-center justify-center bg-black/70 z-20">
        <div className="drop-shadow-lg w-[70rem] h-[34rem] rounded-lg">
          <div className="bg-white w-full h-full flex items-center justify-center rounded-lg">
            <div className="absolute top-3 right-7  w-4 font-bold ">
              <button
                className="text-black border-2 border-t-blue-600 rounded-full px-1.5"
                onClick={() => {
                  closeModal(false);
                }}
              >
                X
              </button>
            </div>

            <div className="flex w-full h-full">
              {/* left section */}
              <div className="w-[42%] bg-gray-100 p-4">
                <div className="px-3">
                  <h2 className="font-semibold text-black font-serif my-3">
                    How{" "}
                    <span className="text-lg text-blue-500 font-serif">
                      FindMyCollege
                    </span>{" "}
                    Help You In Admission
                  </h2>
                </div>
                <div className="my-4 grid grid-cols-4 gap-4 place-items-center h-fit">
                  <div className="w-[8rem] h-[7rem] border-2 bg-white flex flex-col justify-center items-center p-2 ">
                    {" "}
                    <img className="w-16 pt-2" src={svg1} alt="/" />{" "}
                    <p className="text-sm text-black mt-2">education</p>
                  </div>
                  <div className="w-[8rem] h-[7rem] border-2 bg-white flex flex-col justify-between items-center p-3 ">
                    {" "}
                    <img className="w-12" src={svg4} alt="/" />{" "}
                    <p className="text-sm text-black">Deadline</p>
                  </div>
                  <div className="w-[8rem] h-[7rem] border-2 bg-white flex flex-col justify-between items-center p-3">
                    {" "}
                    <img className="w-16" src={svg2} alt="/" />{" "}
                    <p className="text-sm text-black">scholarship</p>
                  </div>
                  <div className="w-[8rem] h-[7rem] border-2 bg-white flex flex-col justify-between items-center p-3 mt-2 ">
                    {" "}
                    <img className="w-10" src={svg3} alt="/" />{" "}
                    <p className="text-sm text-black">24/7Cunselling</p>
                  </div>
                  <div className="w-[8rem] h-[7rem] border-2 bg-white flex flex-col justify-between items-center p-3 mt-2 ">
                    {" "}
                    <img className="w-12" src={svg4} alt="/" />{" "}
                    <p className="text-sm text-black">Deadline</p>
                  </div>
                  <div className="w-[8rem] h-[7rem] border-2 bg-white flex flex-col justify-around items-center p-3 mt-2 ">
                    {" "}
                    <img className="w-16" src={svg5} alt="/" />{" "}
                    <p className="text-sm text-black">Admission</p>
                  </div>
                  <div className="w-[8rem] h-[7rem] border-2 bg-white flex flex-col justify-between items-center p-3  mt-2">
                    {" "}
                    <img className="w-10" src={svg3} alt="/" />{" "}
                    <p className="text-sm text-black">24/7Cunselling</p>
                  </div>
                  <div className="w-[8rem] h-[7rem] border-2 bg-white flex flex-col justify-start items-center p-1 space-y-2 mt-2 ">
                    {" "}
                    <img className="w-16" src={svg6} alt="/" />{" "}
                    <p className="text-sm text-black">Shortlist</p>
                  </div>
                </div>
              </div>

              {/* right section */}
              <div className="w-[58%] mx-1">
                <div className="flex items-center justify-center space-x-6 my-4">
                  <video
                    className="border-4 border-t-blue-500  p-2.5 rounded-full"
                    width="60"
                    height="200"
                    autoPlay
                    loop
                  >
                    {" "}
                    <source src={logo1} type="video/mp4" />
                  </video>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-serif text-black font-bold tracking-wider ">
                      {" "}
                      <span className="text-2xl text-blue-500 font-serif">
                        Register
                      </span>{" "}
                      Now{" "}
                    </h2>
                    <p className="text-black">Get Details & Latest update</p>
                  </div>
                </div>

                <hr className="mx-16" />

                <div className="px-4 mt-4 ">
                  <div className="pt-3 flex items-center justify-center overflow-hidden">
                    <img
                      className="object-cover w-[16rem] mt-[-2.2rem]  "
                      src={regpic}
                      alt="/"
                    />
                  </div>
<form
  onSubmit={handleSubmit}
  className="px-8 md:px-20 w-full flex flex-col items-center"
>
  {/* Full Name */}
  <section className="flex items-center w-full max-w-md">
    <div className="px-3 flex items-center border-2 border-b-[#777771] border-r-0 rounded-l-lg hover:border-b-gray-800">
      <CgProfile
        size="22"
        className="text-gray-700 opacity-50 hover:opacity-70"
      />
    </div>
    <input
      name="name"
      id="name"
      value={user.name}
      onChange={handleInput}
      className="w-full bg-transparent outline-none text-black p-2 border-2 border-b-[#777771] rounded-r-lg hover:border-b-gray-800 text-sm"
      type="text"
      placeholder="Full Name"
      required
    />
  </section>

  {/* Mobile Number */}
  <section className="flex items-center w-full max-w-md">
    <div className="px-3 flex items-center border-2 border-b-[#777771] border-r-0 rounded-l-lg hover:border-b-gray-800">
      <BsTelephone
        size="22"
        className="text-gray-700 opacity-50 hover:opacity-70"
      />
    </div>
    <input
      name="mobileNumber"
      id="mobileNumber"
      value={user.mobileNumber}
      onChange={handleInput}
      className="w-full bg-transparent outline-none text-black p-2.5 border-2 border-b-[#777771] rounded-r-lg hover:border-b-gray-800 text-sm"
      type="tel"
      placeholder="Mobile No."
      required
    />
  </section>

  {/* Location */}
  <section className="flex items-center w-full max-w-md">
    <div className="px-3 flex items-center border-2 border-b-[#777771] border-r-0 rounded-l-lg hover:border-b-gray-800">
      <GrLocation
        size="22"
        className="text-gray-700 opacity-50 hover:opacity-70"
      />
    </div>
    <input
      name="location"
      id="location"
      value={user.location}
      onChange={handleInput}
      className="w-full bg-transparent outline-none text-black p-2.5 border-2 border-b-[#777771] rounded-r-lg hover:border-b-gray-800 text-sm"
      type="text"
      placeholder="Location"
      required
    />
  </section>

  {/* Submit Button */}
  <div className="flex flex-col items-center w-full">
    <button
      className="p-2 w-[19rem] bg-blue-600 hover:bg-blue-700 rounded-lg border-2 text-center hover:tracking-wider text-white font-semibold drop-shadow-lg"
      type="submit"
      onClick={() => {
        sendData();
        closeModal(false);
      }}
    >
      Register
    </button>
  </div>
</form>


                  <div className="text-center mt-4">
                    <p className="font-semibold text-gray-500 ">
                      Already Registered? Click Here to{" "}
                      <a className="text-blue-500" href="/">
                        LOGIN
                      </a>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistrationModal;
