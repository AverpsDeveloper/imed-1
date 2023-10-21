"use client"
import React, { useEffect, useState } from 'react'
import { IoMdCall } from "react-icons/io";
import { BsFillChatFill } from "react-icons/bs"
import { AiFillLinkedin, AiOutlineMail, AiFillTwitterCircle } from "react-icons/ai"
export default function Footer() {
  return (
    <>
      <footer className=" px-10 py-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="">
          <a href="/" className="flex items-center justify-center">
            <span className="text-iPrimary text-title-lg font-bold ">i</span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">MED</span>
          </a>
        </div>
        <div>
          <div className="flex grid-cols-2 justify-center items-center">
            <div className="bg-[#3E5C8F] text-white rounded-full p-3">
              <AiOutlineMail size={30} />
            </div>
            <div className="pl-3 ">
              <p className="text-[14px]">Email address</p>
              <p className="text-white text-title-sm">enquery@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex grid-cols-2 justify-center items-center">
            <div className="bg-[#3E5C8F] text-white rounded-full p-3">
              <IoMdCall size={30} />
            </div>
            <div className="pl-3 ">
              <p className="text-[14px]">Phone Number</p>
              <p className="text-white text-title-sm">+65 8555 0548</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex grid-cols-2 justify-center items-center">
            <div className="bg-iPrimary text-white rounded-full p-3">
              <BsFillChatFill size={30} />
            </div>
            <div className="pl-3 flex gap-5">
              <AiFillLinkedin size={25} />
              <AiFillTwitterCircle size={25} />
            </div>
          </div>
        </div>
      </footer>
      <hr />
      <div className="md:px-10 md:py-7 grid grid-cols-1 md:grid-cols-3 text-white">
        <div className="">
          <h3 className="text-title-md">Quick Links</h3>
          <ul className="py-5 px-10">
            <li className="p-1 md:p-2 list-disc cursor-pointer  text-[14px] md:text-[16px]">Home</li>
            <li className="p-1 md:p-2 list-disc cursor-pointer  text-[14px] md:text-[16px]">Medication</li>
            <li className="p-1 md:p-2 list-disc cursor-pointer  text-[14px] md:text-[16px]">Doctors</li>
            <li className="p-1 md:p-2 list-disc cursor-pointer  text-[14px] md:text-[16px]">Cart</li>
          </ul>
        </div>
        <div>
          <div className="">
            <h3 className="text-title-md">Usefull Links</h3>
            <ul className="py-5 px-10">
              {/* {getPages && getPages.map((pages) => (
                    
                    <li className="p-1 md:p-2 list-disc cursor-pointer  text-[14px] md:text-[16px]" key={pages._id}>
                      <a className="text-[14px] md:text-[16px]" href={`/${pages.slug}`}>
                          {pages.page}
                      </a>
                    </li>
                    ))} */}
              {/* <h1>{ publicPages}</h1> */}
              {/* <li className="p-1 md:p-2 list-disc cursor-pointer text-[14px] md:text-[16px]">Terms & Conditions</li>
                  <li className="p-1 md:p-2 list-disc cursor-pointer text-[14px] md:text-[16px]">Privacy Policy</li>
                  <li className="p-1 md:p-2 list-disc cursor-pointer text-[14px] md:text-[16px]">FAQ</li>
                  <li className="p-1 md:p-2 list-disc cursor-pointer text-[14px] md:text-[16px]">About Us</li> */}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-title-md">Newsletter</h3>
          <p className="py-4 md:py-10 text-title-sm">Sign up today for hints, tips and the latest product news</p>
          <div className="md:flex">
            <input className=" rounded-lg md:rounded-r-none leading-none p-3 w-4/5 border-white " type="email" placeholder="Enter your email" />
            <button className="md:w-32 md:rounded-l-none  bg-[#FFB300] rounded font-medium leading-none text-white p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">subscribe</button>
          </div>
        </div>
      </div>
    </>
  )
}
