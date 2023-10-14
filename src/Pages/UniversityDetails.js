import React from "react";
import collegeBanner from ".././Images/pexels-idriss-meliani-2982449.jpg";
const UniversityDetails = () => {
  return (
    <>
      <section className=" bg-zinc-300 h-[100vh]">
        <div>
          <div className=" relative">
            <img src={collegeBanner} alt="" className=" h-[40vh] w-[100vw] " />
          </div>
          <div className=" absolute top-[10vw] left-[20vw] ">
            <h1 className=" text-[4rem] text-white font-bold">
              Chandigadh <span className=" text-yellow-500">University</span>
            </h1>
          </div>

          <div className="card mx-auto shadow max-w-[60vw] hover:cursor-pointer bg-indigo-200 rounded border mt-4">
            <h3 className=" font-bold m-5">ChandiGadh University</h3>
            <p className="m-5">Lorem ipsum dolor sit amet.</p>

          </div>
        </div>
      </section>
    </>
  );
};

export default UniversityDetails;
