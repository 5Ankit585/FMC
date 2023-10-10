import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import NewAdminData from "./NewAdminData";
import Appp from "../../adminComponents/Appp";
// import { FaAlignCenter } from "react-icons/fa";
const AdminHome = () => {
  const profilePIcDefault =
    "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("");
  const [img, setimg] = useState(profilePIcDefault);
  const [checked, setchecked] = useState(false);

  //covert img
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  //handle img
  const handleImg = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      localStorage["img"] = base64;
      console.debug("File Store", base64);
    });
  };

  //form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      //   toast.error("Name Is Required");
    } else if (email === "") {
      //   toast.error("Email Is Required");
    } else if (password === "") {
      //   toast.error("Password is Required");
    } else {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      // localStorage.setItem("img", img);
      localStorage.setItem("gender", gender);
      localStorage.setItem("terms", checked);
      //   toast.success("User Saved!");
    }
  };

  return (
    <>
      <div className="FormCtainer">
        <Appp />
      </div>
      <Footer />
    </>
  );
};

export default AdminHome;
