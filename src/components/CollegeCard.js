import React from "react";
import { collegesdata } from "./data";
import CollegeCardItem from "./CollegeCardItem";

const CollegeCard = () => {
  return (
    <>
      <div className="p-2 sm:p-8 box-border ">
        <div className="px-8  my-3  lg:my-4  ">
          <h2 className="text-lg sm:text-3xl text-center font-bold uppercase ">Top College/University To Study</h2>
          <div className="flex flex-col items-center justify-center md:flex md:flex-row lg:gap-10 lg:items-center lg:justify-around lg:mt-2 ">
            {collegesdata.map(item=>(
                <CollegeCardItem item={item} key={item.id}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeCard;
