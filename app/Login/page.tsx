"use client";
import './Catstyle.css'
import './form.css'

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from 'next/image';

import CatComponent from './CatComponent'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {

  // Verify password visibility
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  // State for form values
  const [formValues, setFormValues] = useState<FormValues>({
    email: "", password: ""
  });

  const router = useRouter();

  // Handle input change safely
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", //send cookie 
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        router.push("/") //navigate to home page 
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Fetch user profile after login
  const [userProfile, setUserProfile] = useState<any>(null); // เก็บข้อมูล user
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setUserProfile(data);
        console.log("User Profile:", data);
      } else {
        console.error("Failed to fetch profile:", data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className='grid sm:grid-cols-1 grid-cols-2'>
      {/*---------------------------- Left Side ----------------------------*/}
      <div id="leftSide" className="container h-screen sm:w-3/5 w-full left-0">

        {/* Background Image */}
        <Image
          src="/bg/white_cat_and_beagle.jpg"
          alt='Cat staring at dog.'
          width={1500}
          height={1500}
          style={{ objectFit: "cover" }}
          className='absolute w-full sm:h-screen h-[350px] left-0 bg-center'
          placeholder='blur'
          blurDataURL='/bg/white_cat_and_beagle.jpg'
        />
        {/* <div className="absolute h-screen w-full left-0 bg-[url(/bg/white_cat_and_beagle.jpg)] bg-cover bg-center shadow-[inset_-10px_0_15px_rgba(0,0,0,0.5)]"></div> */}
        <CatComponent />
      </div>


      {/* {/*---------------------------- Right Side ----------------------------*/}
      <div className='absolute sm:h-screen sm:w-2/5 w-full bg-white dark:bg-black2 border-0 insert-y right-0 flex-col flex justify-center items-center py-32 max-sm:bottom-0'>

        {/* Web title */}
        <h1 className='md:text-5xl sm:text-4xl xs:text-3xl text-xl w-fit mb-7'>🐶DC Station🐱</h1>

        <form className='w-2/3' onSubmit={handleSubmit}>

          {/* ---- Email ---- */}
          <div className="border-0 relative h-11 w-full min-w-[200px] mb-7">
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="border-0 peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-lg  font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 
              focus:border-theme-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" " />

            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-theme-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[14px] 
              peer-focus:leading-tight peer-focus:text-theme-600 peer-focus:after:scale-x-100 peer-focus:after:border-theme-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Email
            </label>
          </div>

          {/* ---- Passswod ---- */}
          <div className="border-0 relative h-11 w-full min-w-[200px] mb-12">
            <input
              id="password"
              type={isVisible ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="border-0 peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 
              focus:border-theme-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" " />

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
                <EyeIcon className='size-5' aria-hidden="true" />
              )}
            </button>

            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-theme-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[14px] 
              peer-focus:leading-tight peer-focus:text-theme-600 peer-focus:after:scale-x-100 peer-focus:after:border-theme-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Password
            </label>
            <div className='w-full flex justify-end mt-3'>
              <Link href="#" className='text-sm font-semibold text-theme-950 hover:text-theme-800 dark:text-theme-50 dark:hover:text-theme-300'>Forgot password?</Link>
            </div>
          </div>
          
          {/* ---- Button ---- */}
          <button type="submit" className='rounded-xl cursor-pointer w-full text-white h-11 bg-theme-500 hover:bg-theme-600 active:bg-theme-700 shadow-lg'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
