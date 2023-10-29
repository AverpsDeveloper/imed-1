"use client"
import api from "@/http";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCopy } from "react-icons/io";

const PagesListing = () => {

  const [pages, setPages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/pages").then((response) => {
      setPages(response?.data?.result?.data)
    })
  }, [])

  const viewHandler = (id) => {
    if (!id) return;
    router.push(`/dashboard/pages/add?id=${id}`)

  }
  const deletehander = (id) => {
    api.delete(`/pages`, { data: { id } }).then((res) => {
    })
  }
  return (
    <div className="p-4 shadow-md drounded-m rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-bold">Public Pages</h1>
        <Link href="/dashboard/pages/add"
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" /></svg>
          </span>
          Add Page
        </Link>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[60px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Page name
            </th>
            <th className="min-w-[240px] py-4 px-4 font-medium text-black dark:text-white">
              Page title
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Status
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Created
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Updated
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Copy Url
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page, index) => (

            <tr key={page._id}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark pl-9 xl:pl-11">
                <p className="text-black dark:text-white">
                  {page.page}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white">
                  {page.title}
                </h5>
              </td>

              <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white ">

                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${page.published ? "text-success bg-success" : "text-danger bg-danger"
                      }`}
                  >
                    {page.published ? "Published" : "Draft"}
                  </p>
                </h5>
              </td>

              <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white">
                  {page.createdAt.slice(0, 16)}
                </h5>
              </td>


              <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white">
                  {page.updatedAt.slice(0, 16)}
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                <h5 className="font-medium text-black dark:text-white cursor-pointer px-4">
                  <IoIosCopy size={16} />
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button
                    onClick={() => viewHandler(page._id)}
                    className="inline-flex items-center justify-center gap-1 rounded-full bg-opacity-50 text-white bg-primary py-1.5 px-4 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-4 hover:text-white"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deletehander(page._id)}
                    className="inline-flex items-center justify-center gap-1 rounded-full bg-opacity-30 text-danger bg-danger py-1.5 px-4 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-4 hover:text-white"
                  >

                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {pages.map((page, index) => (
        <div key={index} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">


          <div className="col-span-1 flex items-center">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white ">
                {page.page}
              </p>
            </div>
          </div>

          <div className="col-span-2 flex items-center">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white ">
                {page.title}
              </p>
            </div>
          </div>


          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white ">
                {page.published ? "Published" : "Draf"}
              </p>
            </div>
          </div>


          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white ">
                {page.createdAt.slice(0, 16)}
              </p>
            </div>
          </div>


          <div className="col-span-1 flex items-center">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white ">
                {page.updatedAt.slice(0, 16)}
              </p>
            </div>
          </div>


          <div className="col-span-1 flex items-center">
            <div className="flex flex-col sm:flex-row sm:items-center px-5 justify-center">
              <p className="text-sm text-black dark:text-white cursor-pointer">
                <IoIosCopy size={16} />
              </p>
            </div>
          </div>


          <div className="col-span-1 flex items-center">
            <div className="flex flex-col sm:flex-row sm:items-center">

            </div>
          </div>
        </div>
      ))} */}

    </div>
  )
}

export default PagesListing;
