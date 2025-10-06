import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scroll when modal is open
    return () => {
      document.body.style.overflow = "auto"; // enable scroll again when modal closes
    };
  }, []);

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    sendData(); // send data here
  
    const newRecord = { ...user, id: new Date().getTime().toString() };
    setRecords([...records, newRecord]);
    setUser({ name: "", mobileNumber: "", location: "" });
  
    closeModal(false); // close modal after submit
  };
  

  return (
    <>
     <section className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black/70 z-[9999]">
  <div className="drop-shadow-lg w-[54rem] h-[39rem] rounded-lg">
    <div className="bg-white w-full h-full flex items-center justify-center rounded-lg relative">
      {/* Close Button */}
      <div className="absolute top-3 right-7 w-4 font-bold">
        <button
          className="text-black border-2 border-t-yellow-600 rounded-full px-1.5"
          onClick={() => closeModal(false)}
        >
          X
        </button>
      </div>


            <div className="flex w-full h-full">
              {/* left section */}
              <div className="w-[42%] bg-gray-100 p-4">
                <div className="px-3">
                  <h2 className="font-semibold text-black font-serif mt-3">
                    How{" "}
                    <span className="text-lg text-yellow-500 font-serif">
                      FindMyCollege
                    </span>{" "}
                    Help You In Admission
                  </h2>
                </div>
                <div className="my-4 grid place-items-center grid-cols-2  h-fit ">
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
                  <div className="w-[8rem] h-[7rem] border-2 bg-white flex flex-col justify-between items-center p-3 mt-2 ">
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
                <div className="flex items-center justify-center space-x-6 my-6">
                  <video
                    className="border-4 border-t-yellow-500  p-2.5 rounded-full"
                    width="80"
                    height="240"
                    autoPlay
                    loop
                  >
                    {" "}
                    <source src={logo1} type="video/mp4" />
                  </video>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-serif text-black font-bold tracking-wider ">
                      {" "}
                      <span className="text-2xl text-yellow-500 font-serif">
                        Register
                      </span>{" "}
                      Now{" "}
                    </h2>
                    <p className="text-black">Get Details & Latest update</p>
                  </div>
                </div>

                <hr className="mx-16" />

                <div className="px-4 mt-4 ">
                  <div className="p-4 flex items-center justify-center overflow-hidden">
                    <img
                      className="object-cover w-[20rem] mt-[-4.2rem]  "
                      src={regpic}
                      alt="/"
                    />
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className=" px-20 space-y-3.5 w-full mt-[-2.5rem]  "
                  >
                    <section className="flex items-center justify-around">
                      <div className="border-2 p-1.5 border-r-0 rounded-l-lg border-b-[#777771]  hover:border-b-gray-800">
                        <CgProfile
                          size="28"
                          className=" text-gray-900 opacity-30  hover:opacity-40  "
                        />
                      </div>
                      <div className="flex flex-col  ">
                        <label className="" htmlFor="name"></label>
                        <input
                          name="name"
                          id="name"
                          value={user.name}
                          onChange={handleInput}
                          className="w-[16.3rem]  bg-transparent outline-none text-[#000000] border-l-blue-500 p-2.5 rounded-r-lg  border-2 border-b-[#777771]   placeholder:font-serif   hover:border-b-gray-800 text-sm "
                          type="text"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                    </section>

                    <section className="flex items-center justify-around">
                      <div className="border-2 p-2 border-r-0 rounded-l-lg border-b-[#777771]  hover:border-b-gray-800 ">
                        <BsTelephone
                          size="24"
                          className="text-gray-900 opacity-30 hover:opacity-40  "
                        />
                      </div>
                      <div className="flex flex-col ">
                        <label className="" htmlFor="mobileNumber"></label>
                        <input
                          name="mobileNumber"
                          id="mobileNumber"
                          value={user.mobileNumber}
                          onChange={handleInput}
                          className=" w-[16.3rem] bg-transparent outline-none text-[#000000] border-l-blue-500 p-2.5 rounded-r-lg   outline-0  border-2 border-b-[#777771] placeholder:font-serif   hover:border-b-gray-800 text-sm "
                          type="tel"
                          placeholder="Mobile No."
                          required
                        />
                      </div>
                    </section>

                    <section className="flex items-center justify-around">
                      <div className="border-2 p-2 border-r-0 rounded-l-lg border-b-[#777771] hover:border-b-gray-800">
                        <GrLocation
                          size="24"
                          className="opacity-30  hover:opacity-40  "
                        />
                      </div>
                      <div className="flex flex-col ">
                        <label className="" htmlFor="location"></label>
                        <input
                          name="location"
                          id="location"
                          value={user.location}
                          onChange={handleInput}
                          className=" w-[16.3rem] bg-transparent outline-none  text-[#000000] border-l-yellow-500 p-2.5 rounded-r-lg   outline-0  border-2 border-b-[#777771] placeholder:font-serif   hover:border-b-gray-800 text-sm "
                          type="text"
                          placeholder="Location"
                          required
                        />
                      </div>
                    </section>

                    <div className="flex flex-col items-center w-full">
  <button
    className="p-2 w-[19rem] bg-yellow-500 hover:bg-yellow-600 rounded-t-lg border-2 text-center hover:tracking-wider text-white font-semibold drop-shadow-lg"
    type="submit" // ✅ Keep this as submit so it triggers form onSubmit
  >
    Register
  </button>
</div>
</form>


                  <div className="text-center mt-4">
                    <p className="font-semibold text-gray-500 ">
                      Already Registered? Click Here to{" "}
                      <a className="text-yellow-500" href="/">
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
