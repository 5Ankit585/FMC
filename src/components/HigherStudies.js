import React from 'react'
import { higherstudies } from './data'
import HigherStudiesItem from './HigherStudiesItem'

const HigherStudies = () => {
  return (
    <>
      <div className="p-8 box-border ">
        <div className="p-8 my-[-3rem]  lg:my-4">
        <h2 className="text-md sm:text-xl md:text-3xl md:mb-2 text-center  font-bold uppercase ">Top Colleges/University for MBBS, B.Tech, MBA</h2>
          <div  className="flex flex-col items-center justify-center md:flex md:flex-row lg:gap-10 lg:items-center lg:justify-around lg:mt-2">
            {higherstudies.map(item=>(
                <HigherStudiesItem item={item} key={item.id}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HigherStudies
