import React from "react";
import formImage from "../Images/Form-Image.jpg";
import Axios from "axios";

function sendData(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const street = document.getElementById("street").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zip").value;
  const country = document.getElementById("country")?.value;
  const level = document.getElementById("level").value;
  const stream = document.getElementById("stream").value;
  const course = document.getElementById("course").value;

  Axios.post("http://localhost:5000/get-more-college-options", {
    name,
    email,
    mobile,
    street,
    state,
    zip,
    country,
    level,
    stream,
    course,
  })
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

const Form = () => {
  return (
    <section className="p-8 box-border flex flex-col items-center lg:flex lg:flex-row lg:justify-around lg:items-start bg-slate-200">
      {/* Form Container */}
      <div className="w-full max-w-4xl lg:mx-0 lg:p-10 flex flex-col bg-white shadow-lg rounded-xl">
        {/* Centered Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-snug tracking-wide text-center mb-8">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Want to secure your future
          </span>
          <br />
          <span className="text-gray-700">and get more college options:</span>
        </h2>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 justify-items-start">
          {/* First Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-gray-500">
              First Name <span>*</span>
            </label>
            <input
              className="bg-[#EDEDED] text-sm text-black p-2.5 font-medium outline-0 border-2 border-[#777771] rounded-md hover:border-blue-400 w-fit min-w-[12rem]"
              id="name"
              type="text"
              placeholder="E.g. Vishal"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-gray-500">
              Email Address <span>*</span>
            </label>
            <input
              className="bg-[#EDEDED] text-sm text-black p-2.5 font-medium outline-0 border-2 border-[#777771] rounded-md hover:border-blue-400 w-fit min-w-[12rem]"
              id="email"
              type="email"
              placeholder="E.g. vishal@123.com"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-gray-500">Phone Number</label>
            <input
              className="bg-[#EDEDED] text-sm text-black p-2.5 font-medium outline-0 border-2 border-[#777771] rounded-md hover:border-blue-400 w-fit min-w-[12rem]"
              id="mobile"
              type="tel"
              placeholder="E.g. +91 1234556776"
            />
          </div>

          {/* Street */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-gray-500">Street Address</label>
            <input
              className="bg-[#EDEDED] text-sm text-black p-2.5 font-medium outline-0 border-2 border-[#777771] rounded-md hover:border-blue-400 w-fit min-w-[12rem]"
              id="street"
              type="text"
              placeholder="E.g. 32 Wallaby Way"
            />
          </div>

          {/* State */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-gray-500">State/Province</label>
            <input
              className="bg-[#EDEDED] text-sm text-black p-2.5 font-medium outline-0 border-2 border-[#777771] rounded-md hover:border-blue-400 w-fit min-w-[12rem]"
              id="state"
              type="text"
              placeholder="E.g. Haryana"
            />
          </div>

          {/* Zip */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-gray-500">ZIP/Postal Code</label>
            <input
              className="bg-[#EDEDED] text-sm text-black p-2.5 font-medium outline-0 border-2 border-[#777771] rounded-md hover:border-blue-400 w-fit min-w-[12rem]"
              id="zip"
              type="text"
              placeholder="E.g. 123456"
            />
          </div>


          {/* Level */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-gray-500">Select Level</label>
            <input
              className="bg-[#EDEDED] text-sm text-black p-2.5 font-medium outline-0 border-2 border-[#777771] rounded-md hover:border-blue-400 w-fit min-w-[6rem]"
              id="level"
              type="number"
              placeholder="E.g. 10"
            />
          </div>

          {/* Stream */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-gray-500">Stream</label>
            <textarea
              className="bg-[#EDEDED] text-sm text-black p-2.5 rounded-md font-medium outline-0 border-2 border-[#777771] hover:border-blue-400 w-fit min-w-[12rem]"
              id="stream"
              rows="3"
              placeholder="E.g. Science, Commerce"
            ></textarea>
          </div>

          {/* Course */}
          <div className="flex flex-col md:col-span-2 space-y-2">
            <label className="text-xs text-gray-500">Course</label>
            <textarea
              className="bg-[#EDEDED] text-sm text-black p-2.5 rounded-md font-medium outline-0 border-2 border-[#777771] hover:border-blue-400 w-fit min-w-[12rem]"
              id="course"
              rows="3"
              placeholder="E.g. B.Tech, MBA"
            ></textarea>
          </div>

          {/* Submit Button (extra gap above) */}
          <div className="md:col-span-2 mt-10 md:mt-12">
            <button
              className="p-3 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:opacity-90 transition text-white font-semibold rounded-md shadow-md w-fit min-w-[10rem]"
              type="submit"
              onClick={(e) => sendData(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Side Image */}
      <div className="mt-10 max-w-[18rem] sm:max-w-[26rem] lg:max-w-[29rem] lg:mt-[-1px] lg:pt-4">
        <img src={formImage} alt="person" className="rounded-xl shadow-lg" />
      </div>
    </section>
  );
};

export default Form;
