import React, { useState } from "react";
import png from "../Images/speech-bubble-1.png";
import GoogleAuth from "../components/GoogleAuth";
import FacebookAuth from "../components/FacebookAuth";
import RegistrationModal from "./RegistrationModal";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const SignupModal = ({ closeRegModal }) => {
  const [registerModal, setRegisterModal] = useState(false);

  const [records, setRecords] = useState([]);
  const [userRegistration, setUserRegistration] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    console.log(records);
    setRecords([...records, newRecord]);
    console.log(records);

    setUserRegistration({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cpassword: "",
    });

    navigate('/');
  };

  function sendToNode() {
    Axios.post("http://localhost:5000/signup", {
      username: userRegistration.username,
      firstname: userRegistration.firstname,
      lastname: userRegistration.lastname,
      email: userRegistration.email,
      password: userRegistration.password,
      cpassword: userRegistration.cpassword,
    })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <section className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-black/70 z-20">
        <div className="drop-shadow-lg w-[37rem] h-[38rem] rounded-lg">
          <div className="bg-gray-100 w-full h-full flex items-center justify-center rounded-lg">
            <div className="absolute top-2 right-2 w-4 font-bold ">
              <button
                className="text-black"
                onClick={() => {
                navigate('/')
                }}
              >
                X
              </button>
            </div>

            <div className="grid grid-cols-2 w-full h-full">
              <div className="p-3">
                <h2 className="px-6 text-black my-6 font-serif font-semibold text-lg">
                  Sign Up
                </h2>

                <form className="px-6" onSubmit={handleSubmit}>
                  <div className="flex flex-col my-5">
                    <label className="" htmlFor="username"></label>
                    <input
                      name="username"
                      value={userRegistration.username}
                      onChange={handleInput}
                      id="username"
                      className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-gray-500 placeholder:font-serif font-thin  hover:border-b-gray-700 text-sm focus:font-semibold"
                      type="text"
                      placeholder="Username"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col my-5">
                    <label className="" htmlFor="firstname"></label>
                    <input
                      name="firstname"
                      value={userRegistration.firstname}
                      onChange={handleInput}
                      id="firstname"
                      className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-gray-500 placeholder:font-serif font-thin  hover:border-b-gray-700 text-sm focus:font-semibold "
                      type="text"
                      placeholder="First Name"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col my-5">
                    <label className="" htmlFor="lastname"></label>
                    <input
                      name="lastname"
                      value={userRegistration.lastname}
                      onChange={handleInput}
                      id="lastname"
                      className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-gray-500 placeholder:font-serif font-thin  hover:border-b-gray-700 text-sm focus:font-semibold "
                      type="text"
                      placeholder="Last Name"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col my-5">
                    <label className="" htmlFor="email"></label>
                    <input
                      name="email"
                      value={userRegistration.email}
                      onChange={handleInput}
                      id="email"
                      className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-gray-500 placeholder:font-serif font-thin  hover:border-b-gray-700 text-sm focus:font-semibold "
                      type="email"
                      placeholder=" Email"
                      autoComplete="off"
                    />
                  </div>

                  <div className=" my-5">
                    <label className="" htmlFor="password"></label>
                    <input
                      name="password"
                      value={userRegistration.password}
                      onChange={handleInput}
                      id="password"
                      className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2 w-full outline-0  border-2 border-b-gray-500 placeholder:font-serif font-thin hover:border-b-gray-700 text-sm focus:font-semibold"
                      type="password"
                      placeholder=" Password"
                      autoComplete="off"
                    />
                  </div>

                  <div className=" my-5">
                    <label className="" htmlFor="cpassword"></label>
                    <input
                      name="cpassword"
                      value={userRegistration.cpassword}
                      onChange={handleInput}
                      id="cpassword"
                      className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2 w-full outline-0  border-2 border-b-gray-500 placeholder:font-serif font-thin hover:border-b-gray-700 text-sm focus:font-semibold"
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="off"
                    />
                  </div>

                  <div className=" flex flex-col items-center w-full ">
                    <button
                      onClick={() => {
                        // setRegisterModal(true);
                        sendToNode();
                      }}
                      className="p-2 mb-3 md:mb-0 w-full bg-blue-600 hover:bg-transparent hover:text-black border-2 text-center text-white font-semibold drop-shadow-lg"
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
                    >
                      {" "}
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="pt-4">
                <img className="w-[13rem] mt-10" src={png} alt="/" />
                <p className="text-center text-black mt-4">
                  ------- or -------
                </p>
                <div className="flex flex-col justify-center items-center mt-2 w-[17rem]">
                  <GoogleAuth />
                  <FacebookAuth />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupModal;
