import React from 'react'
import Image from 'next/image'
const SrepSections = () => {
  return (
    <section className="bg-iTextPrimary  md:relative flex items-center">
        <div className="mx-auto  max-w-screen-xl px-4 py-12 md:px-2 md:py-8 lg:flex lg:h-70 lg:items-center">
          <div className="flex flex-col md:flex-row px-10 md:px-0">
            <div className="text-title-sm sm:text-title-md md:text-title-xl2/relaxed px-5 text-white ">
              <p className="">Just a <span className="text-[#FFB300] font-bold">3 Easy</span></p> <p>Simple Steps</p>
            </div>
            <div className="mx-auto max-w-2xl md:text-xl/relaxed md:ml-10">
              <p>Lorem ipsum dolor sit amet consectetur. Faucibus euismod netus ultrices blandit morbi penatibus duis tortor tempus. Sit tempor diam tempor at nunc facilisis a quis laoreet.</p>
            </div>
            <div className="flex justify-center items-center self-center mx-auto mt-4 md:mt-0 md:pl-16">
              <button type="button" className="text-white bg-iPrimary p-2 text-title-xsm font-bold  duration-300 hover:iPrimary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl  px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>

            </div>
          </div>
          <div className="md:absolute mx-auto space-y-5 md:space-y-0 md:gap-20 top-50 max-w-screen-xl  px-4 py-10 md:px-2 md:py-8 lg:flex lg:h-70">
            <div className="bg-[#FFFBF2] rounded-md px-10 py-10">
              <Image
                src="/images/card_01.png"
                alt="text"
                className="px-5 py-3"
                height={100}
                width={200}
              />
              <p className="text-iTextPrimary rounded-md  text-xl">Create an account</p>
            </div>

            <div className="bg-[#FFFBF2] rounded-md  px-10 py-10">
              <Image
                src="/images/card_01.png"
                alt="text"
                className="px-5 py-3"
                height={100}
                width={200}
              />
              <p className="text-iTextPrimary text-xl">Create an account</p>
            </div>


            <div className="bg-[#FFFBF2] px-10 py-10">
              <Image
                src="/images/card_01.png"
                alt="text"
                className="px-5 py-3"
                height={100}
                width={200}
              />
              <p className="text-iTextPrimary text-xl">Create an account</p>
            </div>

          </div>

        </div>
      </section>
  )
}

export default SrepSections