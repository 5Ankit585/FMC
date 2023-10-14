import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Modals/LoginModal";
import SignupModal from "../Modals/SignupModal";
import UserProfile from "./UserProfile";
// import logo from "../Images/logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);

  const handleNav = () => {
    setNavbar(!navbar);
  };

  return (
    <div className=" flex justify-center items-center h-20  mx-auto px-4 md:pl-20 md:pr-12 lg:pr-24 text-white relative bg-[rgba(0,0,0,0.3)]">
      <h1
        className="w-full text-2xl font-bold text-yellow-300 hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        FINDMYCOLLEGE
      </h1>

      <div className="hidden sm:flex pr-4 font-semibold">
        { !localStorage.getItem('login') ? <button
          className="bg-transparent text-white px-4 py-2 mr-3 hover:text-yellow-300"
          onClick={() => {
            navigate("/login");
          }}
        >
          LOGIN
        </button>
        :
        <button
          className="bg-transparent text-white px-4 py-2 mr-3 hover:text-yellow-300"
          onClick={() => {
            localStorage.removeItem('login');
            navigate("/login");
          }}>LOGOUT</button>
        }
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="px-3 py-2 hover:text-yellow-300"
        >
          SIGNUP
        </button>

        {/* university login added  */}
        <button
          onClick={() => {
            navigate("/college-profile");
          }}
          className="px-3 py-2 hover:text-yellow-300"
        >
          Upload Your College
        </button>
      </div>

      <div
        onClick={handleNav}
        className="block hover:cursor-pointer hover:text-yellow-400"
      >
        {!navbar ? <AiOutlineMenu size={30} /> : <AiOutlineClose size={30} />}
      </div>

      <div
        className={
          navbar
            ? "fixed z-20 left-0 top-0 w-80 h-[41rem] border-r border-r-gray-800 bg-black ease-in-out duration-500 block "
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-2xl font-bold text-yellow-300 m-3 pt-3">
          FINDMYCOLLEGE
        </h1>

        <ul className="p-3 uppercase ">
          <li className="p-2 py-3 border-b border-b-gray-600 text-black hover:cursor-pointer">
            <UserProfile />
          </li>{" "}
          <Link to={`/contact`}>
            <li className="p-2 py-3 border-b border-b-gray-600 hover:text-gray-400">
              Ask Us
            </li>{" "}
          </Link>
          <li className=" sm:disabled:">
            <button
              onClick={() => {
                navigate("/college-profile");
              }}
              className="px-3 py-2 hover:text-yellow-300"
            >
              Upload Your College
            </button>
          </li>
          <hr />
          <Link to={`/registeration`}>
            <li className="p-2 py-3 border-b border-b-gray-600 hover:text-gray-400">
              Register
            </li>{" "}
          </Link>
          <li
            className="p-2 py-3 border-b border-b-gray-600 cursor-pointer hover:text-gray-400"
            onClick={() => {
              navigate("/login");
            }}
          >
            LogIn
          </li>
          <Link to={`/passwordreset`}>
            <li className="p-2 py-3 border-b border-b-gray-600 hover:text-gray-400">
              Password Reset
            </li>{" "}
          </Link>
          <li className="p-2 py-3 border-b cursor-pointer border-b-gray-600 hover:text-gray-400">
            LogOut
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
