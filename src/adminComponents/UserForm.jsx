import React, { useState } from "react";

const UserForm = ({ data, updateFieldHandler }) => {
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
    <div>
      <div className="form-control">
        <div className="profile_section">
          <p>Select your university Picture :</p>
          <img
            src={profilePIcDefault}
            alt="profile_pic"
            name="file"
            className="img-thumbnail"
            height={250}
            width={250}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input
            className="form-control"
            type="file"
            onChange={handleImg}
            name="file"
            id="formFile"
          />
        </div>

        <label htmlFor="exampleInputName">University/College Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="form-control"
          id="exampleInputName"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">University domain</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
    </div>
  );
};

export default UserForm;
