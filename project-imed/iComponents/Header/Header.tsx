import React from 'react'
import Button from '../Button'

const Header = () => {
  return (
    <nav className="border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <a href="/" className="flex items-center">
            <span className="text-iPrimary text-title-lg font-bold ">i</span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MED</span>
          </a>

          <div className="flex md:hidden md:order-2">
            <button type="button" className="text-white block md:hidden bg-iPrimary p-2 text-itext-xsm font-bold  duration-300 hover:iPrimary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl  px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>

            <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-iTextPrimary rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center hidden  justify-around w-full md:flex md:w-auto gap-3" id="navbar-cta">
            <ul className="flex flex-col items-center text-title-xsm font-bold p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-iTextPrimary rounded  md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">imad</a>
              </li>

              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-iTextPrimary rounded  md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">All Medication</a>
              </li>

              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-iTextPrimary rounded  md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">See Doctor</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-iTextPrimary rounded  md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">FAQ</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-iTextPrimary rounded  md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</a>
              </li>
              <li>
                <Button 
                onClick={()=>{}}
                disabled={false}
                label = "Login/Signup"
                outline />
                {/* <button type="button" className="text-iTextPrimary text-title-xsm font-bold  border-[1px] p-2 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl  px-4 py-2 text-center mr-3 md:mr-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login/Signup</button> */}
              </li>
              <li>

                <button type="button" className="text-white bg-iPrimary p-2 text-title-xsm font-bold  duration-300 hover:iPrimary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl  px-4 py-2 text-center mr-3 md:mr-0 dark:bg-iPrimary dark:hover:bg-iPrimary dark:focus:ring-blue-800">Get started</button>
              </li>
            </ul>

          </div>
        </div>
      </nav>
  )
}

export default Header
