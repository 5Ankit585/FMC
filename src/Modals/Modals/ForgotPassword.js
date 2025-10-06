import React, { useState } from 'react'

const ForgotPassword = ({closeModal}) => {
    const [records, setRecords] = useState([])
    const [userRegistration, setUserRegistration] = useState({
      UsernameorEmail: '',
    });
  
    let name,value;
    const handleInput = (e) => {
      name = e.target.name;
      value = e.target.value;
      console.log(name, value);
      setUserRegistration({...userRegistration,[name]: value,})
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newRecord = {...userRegistration, id: new Date().getTime().toString()}
      console.log(records)
      setRecords([...records, newRecord])
  
      setUserRegistration({UsernameorEmail: ''})
  
      closeModal(false);
    }
    
  return (
    <>
      <section  className='w-full h-full  fixed top-0 left-0 flex items-center justify-center bg-black/70 z-30'>
        <div className='drop-shadow-lg  w-[20rem] sm:w-[30rem] h-[20rem] rounded-xl '>
            <div className='bg-gray-100 w-full h-full flex items-center justify-center'>
             <div className='absolute top-2 right-2 w-4 font-bold'>
              <button className='text-black' onClick={()=>{closeModal(false)}} >X</button>
             </div>

             <div className=" mx-auto p-20">
          <h2 className="font-semibold text-2xl text-center sm:font-bold p-2">
            Password Reset
          </h2>

          <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col my-4 ">
                    <p className="mb-4 text-gray-500 text-md text-center">To reset your password, please enter your email address or username below.</p>
                    <label className="" htmlFor="UsernameorEmail"></label>
                    <input name='UsernameorEmail'
                    value={userRegistration.UsernameorEmail}
                    onChange={handleInput}
                    id='UsernameorEmail' className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-[#777771] placeholder:font-serif font-thin  hover:border-b-gray-400 text-sm " type="text" placeholder='Username or E-mail' required/>
                    </div>

            <div className="my-5 bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold">
            <button className="p-2" type="submit"> Reset Password</button>
        </div>
        </form>

          </div>
         </div>
        </div>
      </section>
    </>
  )
}

export default ForgotPassword
