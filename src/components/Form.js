import React from "react";
import SelectCountry from "./SelectCountry";
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
  const country = document.getElementById("country").value;
  const level = document.getElementById("level").value;
  const stream = document.getElementById("stream").value;
  const course = document.getElementById("course").value;

  Axios.post("http://localhost:5000/get-more-college-options", {
    name: name,
    email: email,
    mobile: mobile,
    street: street,
    state: state,
    zip: zip,
    country: country,
    level: level,
    stream: stream,
    course: course,
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
    <section className="p-8  box-border flex flex-col items-center lg:flex lg:flex-row lg:justify-around  lg:items-start">
      <div className=" max-w-[18rem] sm:max-w-[26rem] lg:max-w-[30rem]  lg:mx-0 lg:p-4 flex flex-col">
        <h2 className=" text-xl sm:text-2xl font-bold break-words w-[18rem] sm:w-[26rem]">
          Want to secure your future and get more college options:
        </h2>

        <form className="">
          <div className="flex flex-col my-5">
            <label className="p-0.5 text-xs text-gray-500 " htmlFor="">
              First Name <span>*</span>
            </label>
            <input
              className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
              id="name"
              type="text"
              placeholder="E.g. vishal"
              required
            />
          </div>

          <div className="flex flex-col my-5">
            <label className="p-0.5 text-xs text-gray-500 " htmlFor="">
              Email Address <span>*</span>
            </label>
            <input
              className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
              id="email"
              type="email"
              placeholder="E.g. vishal@123.com"
              required
            />
          </div>

          <div className="flex flex-col my-5">
            <label className="p-0.5 text-xs text-gray-500 " htmlFor="">
              Phone Number
            </label>
            <input
              className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
              id="mobile"
              type="tel"
              placeholder="E.g. +91 1234556776"
            />
          </div>

          <div className="flex flex-col my-5">
            <label className="p-0.5 text-xs text-gray-500 " htmlFor="">
              Street Address
            </label>
            <input
              className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
              id="street"
              type="text"
              placeholder="E.g. 32Wallaby Way"
            />
          </div>

          <div className="flex flex-col my-5">
            <label className="p-0.5 text-xs text-gray-500 " htmlFor="">
              State/Province
            </label>
            <input
              className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
              id="state"
              type="text"
              placeholder="E.g. Haryana"
            />
          </div>

          <div className="flex flex-col my-5">
            <label className="p-0.5 text-xs text-gray-500 " htmlFor="">
              ZIP/Postal Code
            </label>
            <input
              className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
              id="zip"
              type="text"
              placeholder="E.g. 123456"
            />
          </div>

          <div className="flex flex-col my-5" id="country">
            <SelectCountry />
          </div>

          <div className="flex flex-col my-5">
            <label className="p-0.5 text-xs text-gray-500 " htmlFor="">
              Select Level
            </label>
            <input
              className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
              id="level"
              type="number"
              placeholder="E.g. 10"
            />
          </div>

          <div className="flex flex-col my-5">
            <label className="p-0.5 text-xs text-gray-500 " htmlFor="">
              Stream
            </label>
            <textarea
              className="bg-[#EDEDED] text-[#000000]  font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
              name=""
              id="stream"
              cols="30"
              rows="6"
            ></textarea>
          </div>

          <div className="flex flex-col my-5">
            <label className="p-0.5 text-xs text-gray-500 " htmlFor="">
              Course
            </label>
            <textarea
              className="bg-[#EDEDED] text-[#000000]  font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
              name=""
              id="course"
              cols="30"
              rows="6"
            ></textarea>
          </div>

          <div className="my-5 bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold">
            <button className="p-2" type="submit" onClick={(e) => sendData(e)}>
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="mt-10 max-w-[18rem] sm:max-w-[26rem] lg:max-w-[29rem] lg:mt-[-1px]  lg:pt-4 ">
        <img src={formImage} alt="person" />
      </div>
    </section>
  );
};

export default Form;
