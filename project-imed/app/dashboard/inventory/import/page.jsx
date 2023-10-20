"use client"
import React, { useState } from "react"
import Papa from "papaparse"
import axios from "axios";
function ImportProductPage() {
  const [products, setProduct] = useState([]);
  const [fields, setFields] = useState([])
  const handleFile = (event) => {
    const { files } = event.target;
    console.log("==============");
    Papa.parse(files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        console.log("products::", result);
        setFields(result.meta.fields)
        setProduct(result.data)
        console.log("result::", result);
        axios.post("/api/inventory/bulk", { products: result.data }).then((response) => {
          console.log(response);
        }).catch((err) => {
          console.log(err);
        })
      }
    })
  }
  return (
    <>
      <div
        id="FileUpload"
        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
      >
        <input
          type="file"
          accept=".csv"
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
          onChange={handleFile}
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                fill="#3C50E0"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                fill="#3C50E0"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                fill="#3C50E0"
              />
            </svg>
          </span>
          <p>
            <span className="text-primary">Click to upload</span> or
            drag and drop
          </p>
          <p className="mt-1.5">.CSV</p>
          <p>(Files)</p>
        </div>
      </div>
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">You CSV Data</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Product Type
                </th>
                <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Low
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Exp
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Category
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  FORM
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Vendor
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark pl-9 xl:pl-11">
                    <p className="text-black dark:text-white">
                      {product.Type}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      {product.NAME}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      {product.Low}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      {product.Exp}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      {product.Category}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      {product.FORM}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      {product.Vendor}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${product.Status ? "text-success bg-success" : "text-danger bg-danger"
                        }`}
                    >
                      {product.Status ? "Active" : "Deactive"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ImportProductPage