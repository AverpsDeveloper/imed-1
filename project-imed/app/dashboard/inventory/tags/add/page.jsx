"use client"

import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/http';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tag name is required'),
  description: Yup.string(),
  status: Yup.string().required('Tag status is required'),
});

function ErrMassage({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div className="text-red-500 text-sm">{msg}</div>
      )}
    />
  );
}

function AddTagsPage() {
  const rotuer = useRouter();
  const params = useSearchParams();
  const paramsId = params.get("id")
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    status: 'active',
  })

  const onSubmit = (values, { resetForm }) => {
    // Handle the form submission here
    if (paramsId) {
      values.id = paramsId;
      api.put('/tags', values)
        .then(({ data }) => {
          rotuer.push("/dashboard/inventory/tags")
        })
    } else {
      api.post('/tags', values)
        .then(({ data }) => {
          resetForm(); // Reset the form after successful submission
          // rotuer.push("/dashboard/inventory/categorys")
        })
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="w-full h-full p-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add new Tag</h1>
          <Link href="/dashboard/inventory/tags"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Tags Listing
          </Link>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          <Form>
            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Tag name</label>
              <Field
                type="text"
                name="name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Tag name"
              />
              <ErrMassage name="name" />
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Description</label>
              <Field
                type="text"
                name="description"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Description"
              />
              <ErrMassage name="description" />
            </div>


            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">status</label>
              <Field
                as="select"
                name="status"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
              <ErrMassage name="status" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              {paramsId ? "Update" : "Save"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddTagsPage;