import React from "react";
import Image1 from "../Images/cloud.jpg";

const Cloud = () => {
  const currentDate = new Date();
  return (
    <>
      <section className="p-8 box-border ">
        <div className="  flex items-center flex-col lg:flex lg:flex-row lg:items-start lg:justify-around">
          <div className=" space-y-2  sm:ml-[-3rem] md:ml-[-1rem] lg:mt-8">
            <h2 className="text-xl md:text-2xl font-bold">
              The latest Blogs from findmycollege:
            </h2>
            <p className="text-lg">Hello world!</p>
            <p>lorem | {currentDate.toLocaleDateString()} </p>
          </div>

          <div className="my-9 space-y-4">
            <img className="w-[27.2rem] h-96" src={Image1} alt="cloud" />
            <div className="space-y-2 ">
              <h2 className="text-xl md:text-2xl font-bold">
                Our Planned Upgrade to Cloud Servers
              </h2>
              <p>lorem | {currentDate.toLocaleDateString()} </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cloud;
