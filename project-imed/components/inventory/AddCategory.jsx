
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
  status: Yup.string().required('Category status is required'),
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

function AddCategoryForm() {
  const rotuer = useRouter();
  const params = useSearchParams();
  const paramsId = params.get("id")
  const initialValues = {
    name: '',
    status: 'active',
  };

  const onSubmit = (values, { resetForm }) => {
    // Handle the form submission here
    if (paramsId) {
      values.id = paramsId;
      axios.put('/api/categories', values)
        .then(({ data }) => {
          toast.success(data.result.message);
          rotuer.push("/dashboard/inventory/categorys")
        }).catch(({response}) => {
        toast.error(response.data.error.message)
        })
    } else {
      axios.post('/api/categories', values)
        .then(({ data }) => {
          toast.success('New Category added successfully');
          resetForm(); // Reset the form after successful submission
          // rotuer.push("/dashboard/inventory/categorys")
        })
        .catch(({ response }) => {
          toast.error(response.data?.error?.error);
        });
    }

  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add new category</h1>
          <Link href="/dashboard/inventory/categorys"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Category List
          </Link>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Category Name</label>
              <Field
                type="text"
                name="name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Category name"
              />
              <ErrMassage name="name" />
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">category status</label>
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

export default AddCategoryForm;