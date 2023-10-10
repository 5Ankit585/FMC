import React from "react";
import { placesdata } from "./data";
import PlaceCardItem from "./PlaceCardItem";

const PlaceCard = () => {
  return (
    <>
      <div className="p-8 box-border ">
        <div className="p-8  mt-[-4rem]  lg:my-4 ">
          <h2 className="text-lg sm:text-3xl mb-5 md:mb-2 text-center font-bold uppercase ">Top Places For Study</h2>
          <div className="flex flex-col items-center justify-center md:flex md:flex-row md:gap-6 lg:gap-10 md:items-center md:justify-around ">
          {placesdata.map(item=>(
                <PlaceCardItem item={item} key={item.id}/>
            ))}
          </div>
        </div>
      </div> 
    </>
  );
};

export default PlaceCard;
