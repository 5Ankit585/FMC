import React from 'react'
import image1 from '../Images/register.webp'



const Scholarship = () => {
  return (
    <>
      <section className='w-screen h-full'>
        <div className="heading max-w-7xl mx-auto p-16 my-8 text-center space-y-3 shadow-md">
          <h2 className='text-black text-2xl font-semibold'>Education Loan and Scholarship</h2>
          <p className='text-lg text-gray-600 px-20'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint necessitatibus nobis non, voluptatem, animi beatae, 
          Magnam similique quos cum accusantium eos? In, accusantium quia? Accusantium?</p>
        </div>

        <div className='grid grid-cols-2 w-full h-fit max-w-7xl mx-auto drop-shadow-lg'>
          <div className='pl-4 flex items-center justify-center my-16'> <img className='w-[50rem] ' src={image1} alt="/" /> </div>

          <div className='card p-4 flex flex-col items-center justify-center space-y-6'>
                 <div className=" text-black float-right w-[22rem] h-[9rem] p-3 pl-2 bg-white rounded-lg drop-shadow-lg ">
                    <h1 className='text-lg font-semibold p-1'>Scholarship</h1>
                    <p className='px-1 '>1 Million+ Questions answered by the student community within 24 hours each</p>
                    <p className='px-1 mt-2 font-semibold text-blue-500 hover:text-blue-700 cursor-pointer '>Start Now &gt; </p>
                </div>

                 <div className=" text-black float-right w-[22rem] h-[9rem] p-3 pl-2 bg-white rounded-lg drop-shadow-lg">
                    <h1 className='text-lg font-semibold p-1'>Education Loan</h1>
                    <p className='px-1 '>1 Million+ Questions answered by the student community within 24 hours each</p>
                    <p className='px-1 mt-2 font-semibold text-blue-500 hover:text-blue-700 cursor-pointer '> Ask Now &gt; </p>
                </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Scholarship
