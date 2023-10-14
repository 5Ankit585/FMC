import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import NewAdminData from "./NewAdminData";
import Appp from "../../adminComponents/Appp";
// import { FaAlignCenter } from "react-icons/fa";
const AdminHome = () => {
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
