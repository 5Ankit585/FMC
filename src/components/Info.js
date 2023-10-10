import React from "react";
import { infodata } from "./data";
import InfoItem from "./InfoItem";

const Info = () => {
  return (
    <>
    <div className="p-8  box-border flex flex-col items-center">
      <div className="px-2 sm:px-8 xl:px-32 flex flex-col items-center justify-center md:flex md:flex-row md:gap-6 lg:gap-10 md:items-center md:justify-around flex-wrap md:mt-2">
        {infodata.map(item => (
          <InfoItem item={item} key={item.id} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Info;
