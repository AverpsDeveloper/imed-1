"use client"
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required('Category Name is required'),
  categoryStatus: Yup.string().required('Category Status is required'),
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
  const initialValues = {
    categoryName: '',
    categoryStatus: 'active',
  };

  const onSubmit = (values, { resetForm }) => {
    // Handle the form submission here
    axios.post('/api/new-inventory-category', values)
      .then(({ data }) => {
        if (data.success) {
          toast.success('New Category added successfully');
          resetForm(); // Reset the form after successful submission
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('There was an error. Please try again');
      });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Category</h1>
          <Link href="/dashboard/inventory/category-list">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Category List
            </button>
          </Link>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-600">Category Name</label>
              <Field
                type="text"
                name="categoryName"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter category name"
              />
              <ErrMassage name="categoryName" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Status</label>
              <Field
                as="select"
                name="categoryStatus"
                className="border rounded w-full px-3 py-2 mt-1"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
              <ErrMassage name="categoryStatus" />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddCategoryForm;