import React from "react";
import AdminLayout from "../AdminLayout";


const Reviews = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
          <h1 className="text-title-sm font-semibold text-primary mb-5">Doctors Reviews</h1>
          <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
            <div className="flex w-full flex-wrap gap-3 sm:gap-5">
              <div>
                
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 rounded-lg border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <h1 className="text-title-sm font-semibold text-primary mb-5">Doctors rating</h1>
          <div className="mb-4 justify-between gap-4 sm:flex">
            
            
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reviews;
