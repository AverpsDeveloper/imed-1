import React from 'react'
import Image from "next/image";

export default function DoctorConsultSection() {
  return (
    <>
    <div className="bg-[#F2F7FF] grid grid-cols-1 md:grid-cols-2 justify-center">
          <div className="md:px-16 max-h-50 md:py-10">
            <h3 className="text-title-xxl py-5 text-iTextPrimary font-bold">Consult a Doctor On Your Phone Today</h3>
            <p className="text-title-sm mb-5">Lorem ipsum dolor sit amet consectetur. Faucibus euismod netus ultrices blandit morbi penatibus duis tortor tempus. Sit tempor diam tempor at nunc facilisis a quis laoreet.</p>
            <button type="button" className="text-white bg-iPrimary  text-title-xsm font-bold  duration-300 hover:iPrimary focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl  px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start Your Consult</button>

          </div>
          <div className="">
            <Image
              src="/images/doctor_man.png"
              width={400}
              height={300}
              alt="Doctor"
            />
          </div>
        </div>
    </>
  )
}
