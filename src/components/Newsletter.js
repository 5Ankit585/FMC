import React from "react";
import {BiSearch } from "react-icons/bi";

const Newsletter = () => {
  return (
    <>
      <section className="p-8 box-border mx-auto pb-0">
        <div className="px-14 space-y-3">
          {/* <marquee
            className="text-2xl lg:text-2xl px-3 py-2 font-bold"
            behavior=""
            direction="left">
            Latest Education News And Exam Updates:
          </marquee> */}
          <div className="bg-gray-600 py-10 h-28 flex items-center justify-center ">
            <h2 className="text-2xl font-bold ">Trending Exams</h2>
          </div>
          <div className="search flex items-center justify-between border-2">
                <input type="search" placeholder="College,Course,Exam,Article,News,more" className="p-3 w-full outline-none cursor-pointer z-10 " />
                <BiSearch className="ml-1 bg-blue-400 w-16 p-3  cursor-pointer z-10 " size="49.1 "/>
            </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
