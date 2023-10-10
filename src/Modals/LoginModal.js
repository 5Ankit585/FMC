import React, { useState } from "react";
import GoogleAuth from "../components/GoogleAuth";
// import PasswordReset from '../Pages/PasswordReset';
import ForgotPassword from "./ForgotPassword";
import RegistrationModal from "./RegistrationModal";
// import FacebookAuth from '../components/FacebookAuth';
import Axios from "axios";
import Cookies from "js-cookie";

const LoginModal = ({ closeModal }) => {
  const [openResetModal, setOpenResetModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const [records, setRecords] = useState([]);
  const [userRegistration, setUserRegistration] = useState({
    UsernameorEmail: "",
    password: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    console.log(records);
    setRecords([...records, newRecord]);

    setUserRegistration({ UsernameorEmail: "", password: "" });

    closeModal(false);
  };

  function sendToNode() {
    Axios.post("http://localhost:5000/login", {
      UsernameorEmail: userRegistration.UsernameorEmail,
      password: userRegistration.password,
    })
      .then((resp) => {
        console.log(resp.data);
        let jwt = resp.data.jwtToken;
        Cookies.set("jwtToken", jwt, { expires: 7 });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <section className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-black/70 z-20">
        <div className="drop-shadow-lg  w-[20rem] sm:w-[30rem] h-[32rem] rounded-xl">
          <div className="bg-gray-100 w-full h-full flex items-center justify-center">
            <div className="absolute top-2 right-2 w-4 font-bold">
              <button
                className="text-black"
                onClick={() => {
                  closeModal(false);
                }}
              >
                X
              </button>
            </div>

            <form
              className=" mx-auto w-full px-16 sm:px-24"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col ">
                <label className="" htmlFor="UsernameorEmail"></label>
                <input
                  name="UsernameorEmail"
                  value={userRegistration.UsernameorEmail}
                  onChange={handleInput}
                  id="UsernameorEmail"
                  className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-[#777771] placeholder:font-serif font-thin  hover:border-b-gray-400 text-sm "
                  type="text"
                  placeholder="Username or E-mail"
                  required
                />
              </div>

              <div className=" my-5">
                <label className="" htmlFor="password"></label>
                <input
                  name="password"
                  value={userRegistration.password}
                  onChange={handleInput}
                  id="password"
                  className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2 w-full outline-0  border-2 border-b-[#777771] placeholder:font-serif font-thin hover:border-b-gray-400 text-sm"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="flex   my-5">
                <input type="checkbox" id="vehicle1" name="" value="" />
                <label
                  className=" ml-2 text-sm font-semibold mb-1 text-gray-500 "
                  htmlFor="checkbox"
                >
                  Keep me signed in
                </label>
              </div>

              <div className=" flex flex-col items-center md:flex-row md:space-x-2 w-full ">
                <button
                  onClick={() => {
                    setRegisterModal(true);
                  }}
                  className="p-2 mb-2 md:mb-0 w-full bg-blue-600 hover:bg-transparent hover:text-black border-2 text-center text-white font-semibold drop-shadow-lg"
                  type="button"
                >
                  {" "}
                  Register
                </button>
                {registerModal && (
                  <RegistrationModal closeModal={setRegisterModal} />
                )}
                <button
                  className="p-2 w-full text-black border-2 bg-transparent hover:bg-blue-600 hover:text-white font-semibold drop-shadow-lg"
                  type="submit"
                  onClick={() => sendToNode()}
                >
                  {" "}
                  Login
                </button>
              </div>

              <div className="text-gray-500 text-center mt-5">
                <p
                  onClick={() => {
                    setOpenResetModal(true);
                  }}
                  className="text-sm sm:text-md cursor-pointer hover:text-gray-400"
                >
                  Forgot Your Password
                </p>
                {openResetModal && (
                  <ForgotPassword closeModal={setOpenResetModal} />
                )}
              </div>
              <p className="text-center text-black mt-4">------- or -------</p>

              <div className="flex flex-col justify-center items-center mt-3">
                {/* <FacebookAuth/> */}
                <GoogleAuth />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginModal;
