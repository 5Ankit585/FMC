import React, { useState } from 'react'
import illustration from "../Images/illustration-1.webp";


const ExploreColleges = ({closeModal}) => {
    const [records, setRecords] = useState([])


    const [userRegistration, setUserRegistration] = useState({
        location: '', State: '', City: '', Stream: '', Courses: '', Diploma: ''
    });
  
    let name,value;
    const handleInput = (e) => {
      name = e.target.name;
      value = e.target.value;
      console.log(name, value);
      setUserRegistration({...userRegistration,[name]: value})
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newRecord = {...userRegistration, id:new Date().getTime().toString()}
      console.log(records)
      setRecords([...records, newRecord])
      console.log(records)
  
  
      setUserRegistration({ location: '', State: '', City: '', Stream: '', Courses: '', Diploma: ''  })
  
    //   closeModal(false);
    }
  return (
    <>
       <section  className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-black/70 z-20'>
        <div className='drop-shadow-lg w-[37rem] h-[35rem] rounded-lg'>
          <div className='bg-[#ffffff] w-full h-full flex items-center justify-center rounded-lg' >
           <div className='absolute top-2 right-2 w-4 font-bold '>
            <button className='text-black' onClick={()=>{closeModal(false)}}>X</button>
           </div>

             <div className='grid grid-cols-2 w-full h-full'>
              <div className=''>
                <h2 className='px-6 text-black  my-6 font-serif font-semibold text-lg tracking-wide'>Explore Universities</h2>

                <form className='px-5' onSubmit={handleSubmit}>

                <div className="flex flex-col my-2">
                    <label className="" htmlFor="location"></label>
                    <input name='location'
                     value={userRegistration.location}
                     onChange={handleInput} 
                     id='location' 
                     className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-gray-500 placeholder:font-serif font-semibold  hover:border-b-gray-700 text-sm focus:font-semibold" 
                     type="text" placeholder='location' autoComplete='off'/>
                </div>

                <div className="flex flex-col my-5">
                    <label className="" htmlFor="State"></label>
                    <input name='State'
                     value={userRegistration.State}
                     onChange={handleInput} 
                     id='State' 
                     className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-gray-500 placeholder:font-serif   hover:border-b-gray-700 text-sm focus:font-semibold font-semibold " 
                     type="text" placeholder='State' autoComplete='off'/>
                </div>

                <div className="flex flex-col my-5">
                    <label className="" htmlFor="City"></label>
                    <input name='City'
                     value={userRegistration.City}
                     onChange={handleInput} 
                     id='City' 
                     className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-gray-500 placeholder:font-serif font-semibold  hover:border-b-gray-700 text-sm focus:font-semibold " 
                     type="text" placeholder='City' autoComplete='off'/>
                </div>

                <div className="flex flex-col my-5">
                    <label className="" htmlFor="Stream"></label>
                    <select name='Stream'
                     value={userRegistration.Stream}
                     onChange={handleInput} 
                     id='Stream' 
                     className="bg-transparent outline-none border-x-0 border-t-0 font-semibold text-[#000000] py-2 outline-0  border-2 border-b-gray-500  hover:border-b-gray-700 text-sm focus:font-semibold " 
                     autoComplete='off'>
                        <option className='font-serif  focus:font-semibold' value=''>Stream</option>
                        <option value='Engineering'>Engineering</option>
                        <option value='Management'> Management</option>
                        <option value='Art'>Art</option>
                        <option value='Commerce'>Commerce</option>
                        <option value='Science'>Science</option>
                        <option value='Medical'>Medical </option>
                        <option value='Non-Medical'>Non-Medical</option>
                     </select>
                     
                </div>

                <div className=" my-5">
                    <label className="" htmlFor="Courses"></label>
                    <input name='Courses'
                     value={userRegistration.Courses}
                     onChange={handleInput} 
                     id='Courses' 
                     className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2 w-full outline-0  border-2 border-b-gray-500 placeholder:font-serif font-semibold hover:border-b-gray-700 text-sm focus:font-semibold" 
                     type="text" placeholder=' Courses' autoComplete='off'/>
                </div>

                <div className=" my-5">
                    <label className="" htmlFor="Diploma"></label>
                    <select name='Diploma'
                     value={userRegistration.Diploma}
                     onChange={handleInput} 
                     id='Diploma' 
                     className="bg-transparent outline-none border-x-0 border-t-0  font-semibold text-[#000000] py-2 w-full outline-0  border-2 border-b-gray-500  hover:border-b-gray-700 text-sm focus:font-semibold" 
                     placeholder='Diploma' autoComplete='off'>
                        <option className='font-serif focus:font-semibold' value=''>Diploma</option>
                        <option value='B.Tech'>B.Tech</option>
                        <option value='M.Tech'> M.Tech</option>
                        <option value='BBA'>BBA</option>
                        <option value='PGDMA'>PGDMA</option>
                        <option value='MBA'>MBA</option>
                        <option value='B.COM '>B.COM </option>
                        <option value='B.A '>B.A </option>
                        <option value='M.A'>M.A </option>
                        <option value='MBBS'>MBBS </option>

                     </select>
                </div>

                <div className=" flex flex-col items-center w-full ">
                        <button className="p-2 mt-3 md:mb-0 w-full bg-blue-600 hover:bg-transparent hover:text-black border-2 text-center text-white font-semibold drop-shadow-lg" type="submit"> Submit</button>
                    </div>

                </form>

              </div>
              <div className=' flex flex-col items-center justify-center'>
                <img className='' src={illustration} alt="/" />
              </div>
             </div>
             
          </div>
        </div>
      </section>
    </>
  )
}

export default ExploreColleges
