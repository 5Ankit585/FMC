import React from "react";
import { BsInstagram , BsFacebook , BsTwitter, BsPinterest} from "react-icons/bs";
import {Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className="w-screen h-fit bg-black opacity-95 text-white pt-24 px-8 md:px-2 box-border">
        <div className="flex flex-col md:flex-row flex-wrap lg:gap-x-52 xl:gap-7  items-start justify-around ">
          <div className=" p-9 md:px-12">
            <h1 className="py-2 mb-2 text-lg font-semibold font-serif" >Top Exam</h1>
            <ul className="list-none text-gray-400 space-y-1 text-md cursor-pointer " >
             <li><Link to="/">College Review</Link></li>
              <li><Link to="/">Top Colleges in India</Link></li>
              <li><Link to="/">Top Engineering Colleges in India</Link></li>
              <li><Link to="/">Top Law Colleges in India</Link></li>
              <li><Link to="/">service</Link></li>
              <li><Link to="/">LPU</Link></li>
              <li><Link to="/">UPES</Link></li>
              <li><Link to="/">Great Lakes</Link></li>
              <li><Link to="/">MAHE (Manipal University) </Link></li>
              <li><Link to="/">SRM University Chennai</Link></li>
            </ul>
          </div>
          <div className=" p-9 md:px-12">
          <h1 className="py-2 mb-2 text-lg font-semibold font-serif" >Predictors & Ebooks</h1>
            <ul className="list-none text-gray-400 space-y-1 text-md cursor-pointer " >
              <li><Link to="/">JEE Main 2023</Link></li>
              <li><Link to="/">NEET 2023</Link></li>
              <li><Link to="/">GATE 2023</Link></li>
              <li><Link to="/">CAT 2022</Link></li>
              <li><Link to="/">CMAT 2023</Link></li>
              <li><Link to="/">CLAT 2023</Link></li>
              <li><Link to="/">IIT JAM 2023</Link></li>
              <li><Link to="/">LPUNEST 2023</Link></li>
              <li><Link to="/">MET 2023</Link></li>
              <li><Link to="/">KCET 2023</Link></li>
              <li><Link to="/">SET 2023</Link></li>
            </ul> 
          </div>
          <div className=" p-9 md:px-12">
          <h1 className="py-2 mb-2 text-lg font-semibold font-serif" >College</h1>
            <ul className="list-none text-gray-400 space-y-1 text-md cursor-pointer " >
              <li><Link to="/">JEE Main College Predictor</Link></li>
              <li><Link to="/">Jee Main Rank Predictor</Link></li>
              <li><Link to="/">JEE Advanced College Predictor</Link></li>
              <li><Link to="/">NEET College Predictor</Link></li>
              <li><Link to="/">CAT College Predictor</Link></li>
              <li><Link to="/">education lkapsoda la</Link></li>
              <li><Link to="/">CLAT College Predictor</Link></li>
              <li><Link to="/">CAT Percentile Predictor</Link></li>
              <li><Link to="/">E-books & Sample Paper</Link></li>
              <li><Link to="/">NEET Rank Predictor</Link></li>
              <li><Link to="/">College Predictor</Link></li>
            </ul>
          </div>
          <div className=" p-9 md:px-12">
          <h1 className="py-2 mb-2 text-lg font-semibold font-serif" >Resources</h1>
            <ul className="list-none text-gray-400 space-y-1 text-md cursor-pointer " >
              <li><Link to="/companion">B.Tech Companion</Link></li>
              <li><Link to="/">MBBS Companion</Link></li>
              <li><Link to="/">NCERT</Link></li>
              <li><Link to="/">Courses</Link></li>
              <li><Link to="/">Digital Marketing Courses</Link></li>
              <li><Link to="/">Counselling Webinars</Link></li>
              <li><Link to="/">BITSAT 2023 Cutoff</Link></li>
              <li><Link to="/">education</Link></li>
              <li><Link to="/">B.Tech</Link></li>
              <li><Link to="/">Full Forms</Link></li>
              <li><Link to="/">MBBS</Link></li>
            </ul>
          </div>
        </div>

        <div className="md:border-y-2 md:mt-9 lg:mt-14 md:flex md:items-center md:justify-between mx-7 lg:px-16">

            <div className="hidden lg:flex">
              <h1 className="text-xl font-semibold">FindMyCollege</h1>
            </div>
            <div className="p-2 md:px-6">
              <ul className="list-none md:flex md:space-x-9  sm:text-lg font-semibold text-gray-400 " >
                <li><Link to="/">home</Link></li>
                <li><Link to="/privacy">privacy</Link></li>
                <li><Link to="/contact">contact</Link></li>
                <li><Link to="/about">about</Link></li>
                <li><Link to="/services">services</Link></li>
              </ul> 
            </div>

            <div className="p-9 flex items-center ml-[-1.8rem]  space-x-7 opacity-80">
                <BsInstagram size="20"/>
                <BsFacebook size="20"/>
                <BsTwitter size="20"/>
                <BsPinterest size="20"/>
            </div>
        </div>

        <div className="w-screen">
            <p className="text-center py-8 opacity-60">© 2023 FindMyCollege Pvt. Ltd. All Rights Reserved</p>
        </div>

      </section>
    </>
  );
};

export default Footer;
