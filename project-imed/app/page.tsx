"use client"
import ECommerce from "@/components/Dashboard/Dashboard";
// import Navbar from "@/iComponents/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/iComponents/footer/Footer"
import DoctorConsultSection from "@/iComponents/footer/DoctorConsultSection";
import FAQSection from "@/iComponents/faqSection/FAQSection"
import TransparentSection from "@/iComponents/faqSection/TransparentSection"
import SrepSections from "@/iComponents/faqSection/SrepSections";
import Header from "@/iComponents/Header/Header";
import {FaGreaterThan} from "react-icons/fa"
export default function Home() {
  return (
    <>

      <Header/>
      <section className=" grid grid-cols-1 md:grid-cols-2 mt-10">

        <div className="flex flex-col justify-center ml-22">
          {/* <hr className="font-bold text-[#FFB300] h-30 w-30 rounded-full top-[50px] "/> */}
          <h2 className="text-title-xsm  font-bold  text-transparent md:text-3xl  bg-clip-text bg-gradient-to-r from-iPrimary to-[#FFB300]">CONNECT. CONSULT. AND CARE</h2>
          <h2 className=" text-title-xsm  font-bold md:text-4xl ">Huge Cost <span className="text-[#FFB300]">Savings </span>Access  <span className="text-[#FFB300]">wholesale prices Affordable Medicines </span></h2>
          <div className="mt-10 mb-10 md:mb-0">
            <button type="button" className="flex justify-center items-center">
              
              <div className="text-white bg-iPrimary p-2  text-title-xsm  font-bold  duration-300 rounded-2xl  px-4 py-2 text-center mr-3 ">
              <FaGreaterThan size={20}/>
              </div>
              <div className="text-whitep-2 text-title-xsm font-bold">Explore More</div> </button>
          </div>
        </div>
        <div className="hidden md:block justify-center items-center">
          <Image
            height={300}
            width={350}
            src="/images/doctor_01.png"
            alt="avatar"
          />
        </div>
      </section>

      {/* <section className="bg-white flex flex-col justify-center items-center">
        <div className=" mt-10 mb-10  flex flex-col justify-center items-center">
          <h2 className="text-4xl text-iTextPrimary font-bold">Exactly How We Price</h2>
          <h3>For example, a 3 month supply of Amlodipine 10 mg (Generic for Norvasc)
            will cost :Retail price at Pharmacy or Clinic: S$135
            Your drug cost with us: $ 33.70</h3>
            <h3>Savings: $101.30</h3>
        </div>
      </section> */}
      <section className="bg-white">
        <div className="mx-auto max-w-full px-4 py-12 md:px-4 md:py-32 flex justify-center items-center">

          <div className="mx-auto flex">
            <div className="hidden md:block md:mt-30">
              <Image
                src="/images/home_02.png"
                height={80}
                width={80}
                alt="text"
              ></Image>
            </div>
            <div className=" max-w-3xl text-center">
              <h1 className="text-4xl text-iTextPrimary font-bold " >
                Exactly How We Price
              </h1>
              <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                For example, a 3 month supply of Amlodipine 10 mg (Generic for Norvasc)
                will cost :Retail price at Pharmacy or Clinic: S$135
                Your drug cost with us: $ 33.70!
              </p>
              <p className="text-4xl font-bold text-[#FFB300]">Savings: $101.30</p>
            </div>

            <div className="hidden md:block">
              <Image
                src="/images/home_02.png"
                height={150}
                width={150}
                alt="text"
              ></Image>
            </div>
          </div>
        </div>
      </section>

      <SrepSections/>
      <div className="bg-white pt-10">
        <TransparentSection />
        <FAQSection />
        <DoctorConsultSection />

        <div className="bg-iTextPrimary px-10 py-7">
          <Footer />
        </div>
      </div>
    </>
  );
}
