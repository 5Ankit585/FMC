import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import React, { useState } from "react";
import "./AdminLogin.css";
// import bgImg from '../assets/img1.jpg';

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //getting email password
  const userName = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "admin@admin.com";
  const userPassword = localStorage.getItem("password")
    ? localStorage.getItem("password")
    : "admin";

  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === userName && password === userPassword) {
      alert("Login success");
      navigate("/profile");
    } else {
      alert("something Wrong");
    }
  };
  return (
    <section>
      <div className="register">
        <div className="col-1">
          <h2>Register Your college</h2>
          <span>To Increase your reach to the students</span>

          <form id="form" className="flex flex-col">
            <input
              type="!email"
              placeholder="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
            />
            {/* <input type="password" placeholder="confirm password" /> */}
            <input type="text" placeholder="mobile number" />
            <button className="btn" onClick={handleSubmit}>
              Sign In
            </button>
          </form>
        </div>
        <div className="col-2">{/* <img src={bgImg} alt="" /> */}</div>
      </div>
    </section>
  );
}
