import React from 'react'

export default function TransparentSection() {
  return (
    <section className="bg-[#F2F7FF] ">
          <div className="mt-50 grid grid-cols-2 p-12 ">
            <div className="mx-auto">
              <h1 className="mx-auto md:text-title-xxl px-5 font-bold">We Don't Keep Secrets. </h1>
              <p className="md:text-title-xxl px-5 font-bold">We are Always</p>
              <p className="mx-auto w-125 px-5 text-iPrimary md:text-title-xxl bg-gradient-to-r from-[#85CCFF]  to-[#85CCFF] bg-[length:100%_15px] bg-no-repeat bg-bottom"> Transparent Pricing</p>
            </div>
            <div className="flex gap-3 ">
              <div className="bg-[#DEE8F9] mt-16 mx-auto px-10 py-10 rounded-lg">
                <h2 className="text-title-lg">Retail Price</h2>
                <span>No Transparent Price</span>
                <p className="mt-2 md:mt-5">No Manufacturing Cost</p>
                <p className="mt-2 md:mt-3">No Markup</p>
                <p className="mt-2 md:mt-3">No Dispensary Labor</p>
                <p className="mt-2 md:mt-3">No Shipping</p>
              </div>
              <div className="bg-iTextPrimary text-white mx-auto mb-16 px-10 py-10 rounded-lg">
                <h2 className="text-title-lg">Retail Price</h2>
                <span>No Transparent Price</span>
                <p className="mt-5">No Manufacturing Cost</p>
                <p className="mt-3">No Markup</p>
                <p className="mt-3">No Dispensary Labor</p>
                <p className="mt-3 ">No Shipping</p>
              </div>
            </div>
          </div>
        </section>
  )
}
