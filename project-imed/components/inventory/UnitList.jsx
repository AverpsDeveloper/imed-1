"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from "@/components/common/Loader";
import Modal from "./Modal"

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter item name'),
  type: Yup.string().required('Please select item type'),
});

function ErrMessage({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div className="text-red-500 text-sm">{msg}</div>
      )}
    />
  );
}

function CategoryList() {

  const [filterType, setFilterType] = useState('itemTypes');
  const [categories, setTypesData] = useState([])
  const [loading , setloading] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: '',
    type: '',
  })
  const [oldType, setOldType] = useState("")
  // Check if categories is undefined or not an array, and set it to an empty array if necessary.
  // if (!Array.isArray(categories)) {
  //   categories = [];
  // }

  const [searchTerm, setSearchTerm] = useState('');

  const nextCategoryId =
    categories.length > 0 ? Math.max(...categories.map(category => category.id)) + 1 : 1;

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function filterHandler(type) {
    setloading(true)
    setFilterType(type)
  }
  function deleteHandler(name) {
    setloading(true)
    axios.delete(`/api/types/${filterType}`, { data: { name } }).then(({ data }) => {
      console.log(data);
      setloading(false)
      toast.success(data.result.message);
    }).catch((error) => {
      setloading(false)
      toast.error('There was an error. Please try again');
    });
  }
  useEffect(() => {
    axios.get(`/api/types/${filterType}`)
      .then(({ data }) => {
        setTypesData(data.result.data);
        setloading(false)
      })
      .catch((err) => {
        console.error(err);
        setloading(false)
        toast.error('There was an error. Please try again');
      });
  }, [loading])
 
  function editHander(name,type){
    setOldType(name)
    setInitialValues({name: name,type: type})
  }
  
  const onSubmit = (values, { resetForm }) => {
    setloading(true)
    // Handle the form submission here
    values.target = oldType;
    axios.put(`/api/types/${values.type}`, values)
      .then(({ data }) => {
        if (!data.error) {
          resetForm(); // Reset the form after successful submission
          setShowModal(false);
          setloading(false)
          toast.success('Type update successfully');
        } else {
          setloading(false)
          toast.error(data.error.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setloading(false)
        toast.error('There was an error. Please try again');
      });
  }
  if (loading){
    return <>
      <Loader/>
    </>
  }

  return (
    <>
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Type List</h1>
        <Link href="/dashboard/inventory/units/add"
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" /></svg>
          </span>
          Add Types
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        {/* <button
            className={`px-4 py-2 rounded ${
              setFilterType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => filterHandler("")}
          >
            All
          </button> */}
        <button
          className={`${filterType === 'itemTypes' ? "bg-primary text-white" : "border border-primary text-primary"
            } inline-flex items-center justify-center rounded-md py-2 px-4 text-center font-medium hover:bg-opacity-90 lg:px-6 xl:px-6`}
          onClick={() => filterHandler("itemTypes")}
        >
          Item Type
        </button>
        <button
          className={` ${filterType === 'formTypes' ? "bg-primary text-white" : "border border-primary text-primary"
            } inline-flex items-center justify-center rounded-md py-2 px-4 text-center font-medium hover:bg-opacity-90 lg:px-6 xl:px-6`}
          onClick={() => filterHandler("formTypes")}
        >
          Form Type
        </button>
        <button
          className={`px-4 py-2 rounded ${filterType === 'unitsTypes' ? "bg-primary text-white" : "border border-primary text-primary"
            } inline-flex items-center justify-center rounded-md py-2 px-4 text-center font-medium hover:bg-opacity-90 lg:px-6 xl:px-6`}
          onClick={() => filterHandler("unitsTypes")}
        >
          Units Type
        </button>
        <button
          className={`px-4 py-2 rounded ${filterType === 'strengthTypes' ? "bg-primary text-white" : "border border-primary text-primary"
            } inline-flex items-center justify-center rounded-md py-2 px-4 text-center font-medium hover:bg-opacity-90 lg:px-6 xl:px-6`}
          onClick={() => filterHandler("strengthTypes")}
        >
          Strength Type
        </button>
      </div>
      <div className="flex justify-end my-4">
        <input
          type="text"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          placeholder="Search Unit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCategories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[60px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Serial No
              </th>
              <th className="min-w-[280px] py-4 px-4 font-medium text-black dark:text-white">
                Unit Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((name, index) => (
              <tr key={name}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark pl-9 xl:pl-11">
                  <p className="text-black dark:text-white">
                    {index + 1}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                  <button
                          onClick={() => {setShowModal(true) ,editHander(name,filterType)}}
                          className="inline-flex items-center justify-center gap-1 rounded-full bg-opacity-50 text-white bg-primary py-1.5 px-4 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-4 hover:text-white"
                        >
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585l-1.59 1.584l-1.586-1.585l1.589-1.584zM6 16v-1.585l7.04-7.018l1.586 1.586L7.587 16H6zm-2 4h16v2H4z" /></svg>
                          </span>
                          Edit
                        </button>
                    <button
                      onClick={() => deleteHandler(name)}
                      className="inline-flex items-center justify-center gap-1 rounded-full bg-opacity-30 text-danger bg-danger py-1.5 px-4 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-4 hover:text-white"
                    >
                      <span>
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </span>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    <Modal isVisibale={showModal} onClose={()=>setShowModal(false)}>
      <h1 className='text-xl mb-2 font-bold text-center text-black'>Edit items Modal Modal</h1>
      <hr />
       <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          <Form className='p-5'>

            <div className="mb-4 ">
              <label className="mb-3 block text-black dark:text-white">
                Select Type
              </label>
              <Field
                as="select"
                name="type"
                disabled={true}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

              >
                <option value="">Select Type</option>
                <option value="itemTypes">Item Type</option>
                <option value="formTypes">Form Type</option>
                <option value="unitsTypes">Units Type</option>
                <option value="strengthTypes">Strength Type</option>
              </Field>
              <ErrMessage name="type" />
            </div>


            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">
                Type Name
              </label>
              <Field
                type="text"
                name="name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Enter type name"
              />
              <ErrMessage name="name" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Update
            </button>
          </Form>
        </Formik>
    </Modal>
</>
    );
}

export default CategoryList;
// Dummy data for testing
