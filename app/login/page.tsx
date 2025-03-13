"use client";
import './Catstyle.css'
import './form.css'

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

import CatComponent from './CatComponent'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { useActionState, Suspense } from 'react';
import { authenticate } from '../lib/action';
import { useSearchParams } from 'next/navigation';

function CallbackUrlReadOnly() {
  const searchParams = useSearchParams()
  const callBackUrl = searchParams.get("callbackUrl") || "/dashboard"

  return <input type="hidden" name="redirectTo" value={callBackUrl} readOnly />
}

export default function Login() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )

  // Verify password visibility
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(prevState => !prevState);
  ;

  return (
    <div className={`grid sm:grid-cols-1 grid-cols-2 ${isPending && "cursor-wait"}`}>
      {/*---------------------------- Left Side ----------------------------*/}
      <div id="leftSide" className="absolute right-0 bottom-0 h-screen lg:w-3/5 md:w-2/5 sm:3/5 w-full left-0">

        {/* Background Image */}
        <Image
          src="/bg/white_cat_and_beagle.jpg"
          alt='Cat staring at dog.'
          width={0}
          height={0}
          sizes="100%"
          style={{ objectFit: "cover" }}
          className='absolute w-full sm:h-screen h-[350px] left-0 bg-center'
          placeholder='blur'
          blurDataURL='/bg/white_cat_and_beagle.jpg'
        />
        <CatComponent />
      </div>


      {/* {/*---------------------------- Right Side ----------------------------*/}
      <div className='absolute sm:h-screen lg:w-2/5 md:w-3/5 sm:2/5 w-full bg-white dark:bg-black2 border-0 sm:border-l-1 max-sm:border-t-1 border-white/15 insert-y right-0 flex-col flex justify-center items-center py-32 max-sm:bottom-0'>

        {/* Web title */}
        <h1 className='md:text-5xl sm:text-4xl text-3xl font-semibold w-fit mb-7'>🐶DC Station🐱</h1>

        <form className='w-2/3' action={formAction}>

          <Suspense>
            <CallbackUrlReadOnly />
          </Suspense>

          {/* ---- Email ---- */}
          <div className="border-0 relative h-11 w-full min-w-[200px] mb-7">
            <input
              type="email"
              name="email"
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
              required
              autoComplete="current-password"
              className="border-0 peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-lg font-normal outline-0 transition-all placeholder-shown:border-blue-gray-200 
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
                <EyeSlashIcon className='size-5 dark:text-white text-black' aria-hidden="true" />
              ) : (
                <EyeIcon className='size-5 dark:text-white text-black' aria-hidden="true" />
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
          <button aria-disabled={isPending} type="submit" className='rounded-xl cursor-pointer w-full text-white h-11 button-theme shadow-lg'>
            {!isPending ? "Login" : <div className='size-6 loading'></div>}
          </button>
        </form>

        {errorMessage && (
          <div className='flex my-3 space-x-1 items-center'>
            <ExclamationCircleIcon className='size-6 text-red-500' />
            <p className='text-sm! p-0! text-red-500'>{errorMessage}</p>
          </div>
        )}

      </div>
    </div>
  )
}
