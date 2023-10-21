"use client"
import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from "@/components/common/Loader";



const validationSchema = Yup.object().shape({
  name: Yup.string().required('Unit name is required'),
  type: Yup.string().required('Please select type'),
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

function AddUnitForm() {
  const initialValues = {
    name: '',
    type: '',
  };
 
  const [loading, setloading] = useState(false)
  const onSubmit = (values, { resetForm }) => {
    setloading(true)
    // Handle the form submission here
    axios.post(`/api/types/${values.type}`, values)
      .then(({ data }) => {
        if (!data.error) {
          resetForm(); // Reset the form after successful submission
          setloading(false)
          toast.success('New Unit added successfully');
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
  };


if (loading){
  return <Loader/>
}  
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="w-full h-full p-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Types</h1>
          <Link href="/dashboard/inventory/units"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Type List
          </Link>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>

            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">
                Select Type
              </label>
              <Field
                as="select"
                name="type"
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
                placeholder="Type name"
              />
              <ErrMessage name="name" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddUnitForm;