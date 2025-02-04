"use client"
import axios from 'axios';
import './Catstyle.css'
import './form.css'
import { useState } from "react";
import CatComponent from './CatComponent'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";


interface FormValues {
    username: string;
    password: string;
    remember: boolean;
  }

export default function Login(){
    const onFinish = (values: FormValues) => {
        const {username, password} = values
        axios.post('http://localhost:3001/validatePassword', {username, password})
        .then(res => {
          if(res.data.validation){
            alert('Your password is correct, thank you for your service')
          }
          else{
            alert('Your password is not correct. Please try again.')
          }
        })
        console.log('Received values of form: ', values);
      };

    // Configuration for the Cat Scripts
    const catConfig = {
      leftId: "leftSide",
      handWrapSelector: ".hand-wrap .hand",
      mouthSelector: ".mouth",
    };

    // verify password visibility
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(prevState => !prevState);


    return(
      <div>

        {/* ทางซ้าย */}
        <div id="leftSide" className="container h-screen w-3/5 left-0">

        {/* bg */}
        <div className="absolute h-screen w-full left-0 bg-[url(/bg/white_cat_and_beagle.jpg)] bg-cover bg-center shadow-[inset_-10px_0_15px_rgba(0,0,0,0.5)]"></div>
            {/* cat components */}
            <CatComponent/>
        </div>

        
        {/* ทางขวา */}
        <div className='border-0  h-screen w-2/5 bg-white absolute insert-y right-0 flex-col flex justify-center items-center'>
           
          {/* Web title */} 
          <h1 className='w-fit font-light mb-7'>DC Station</h1>

          <form className='w-2/3'>
            {/* ส่วน email */}
            <div className="border-0 relative h-11 w-full min-w-[200px] mb-7">
              <input type="email" className="border-0 peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-lg  font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 
                focus:border-yellow-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=" "/>

              <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[14px] 
                peer-focus:leading-tight peer-focus:text-yellow-600 peer-focus:after:scale-x-100 peer-focus:after:border-yellow-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
            </div>

            {/* ส่วน password */}
            <div className="border-0 relative h-11 w-full min-w-[200px] mb-12">
              <input type={isVisible ? "text" : "password"} className="border-0 peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 
                focus:border-yellow-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder=" "/>
              
              {/* eye button */}
              <button
                className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeSlashIcon className='size-5' aria-hidden="true" />
                ) : (
                  <EyeIcon className='size-5' aria-hidden="true"/>
                )}
              </button>

              <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-yellow-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[14px] 
                peer-focus:leading-tight peer-focus:text-yellow-600 peer-focus:after:scale-x-100 peer-focus:after:border-yellow-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
              <div className='w-full flex justify-end mt-3'>
                <a href="#" className='text-sm font-semibold text-amber-950 hover:text-amber-800'>Forgot password?</a>
              </div>
            </div>

            <button className='rounded-xl cursor-pointer w-full text-white h-11 bg-amber-900 hover:bg-amber-600 focus:bg-amber-950'>
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }